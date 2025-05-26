"use strict";
/**
 * Long-Term Memory Manager for Gnosta.ai
 *
 * A comprehensive memory system using Context7 + Upstash Redis for persistent,
 * queryable memory that survives across sessions and contexts.
 *
 * @author Gnosta.ai Development Team
 * @version 1.0.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongTermMemoryManager = void 0;
exports.createRedisClient = createRedisClient;
exports.exampleUsage = exampleUsage;
const LongTermMemoryTypes_1 = require("./LongTermMemoryTypes");
/**
 * Main Long-Term Memory Manager Class
 */
class LongTermMemoryManager {
    constructor(redisClient, namespace = 'memory', cacheEnabled = true) {
        this.redis = redisClient;
        this.namespace = namespace;
        this.cacheEnabled = cacheEnabled;
        this.cache = new Map();
    }
    // Utility Methods
    generateId(prefix) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 9);
        return `${prefix}_${timestamp}_${random}`;
    }
    getKey(type, id) {
        return `${this.namespace}:${type}:${id}`;
    }
    async setCache(key, data, ttl = 300) {
        if (this.cacheEnabled) {
            this.cache.set(key, {
                data,
                expiry: Date.now() + (ttl * 1000)
            });
        }
    }
    async getCache(key) {
        if (!this.cacheEnabled)
            return null;
        const cached = this.cache.get(key);
        if (cached && cached.expiry > Date.now()) {
            return cached.data;
        }
        this.cache.delete(key);
        return null;
    }
    async clearCache(pattern) {
        if (!pattern) {
            this.cache.clear();
            return;
        }
        for (const key of this.cache.keys()) {
            if (key.includes(pattern)) {
                this.cache.delete(key);
            }
        }
    }
    // Task Memory Management
    async createTaskMemory(task) {
        const id = this.generateId('task');
        const now = new Date();
        const taskMemory = {
            ...task,
            id,
            metadata: {
                createdAt: now,
                updatedAt: now,
                lastAccessedAt: now,
                accessCount: 0,
                source: 'manual',
                context: {}
            },
            evolution: [{
                    timestamp: now,
                    changeType: 'created',
                    newValue: task,
                    author: 'system'
                }]
        };
        const key = this.getKey('tasks', id);
        await this.redis.set(key, JSON.stringify(taskMemory));
        // Update indexes
        await this.updateTaskIndexes(taskMemory);
        // Clear relevant caches
        await this.clearCache('tasks');
        return taskMemory;
    }
    async updateTaskMemory(id, updates) {
        const key = this.getKey('tasks', id);
        const existing = await this.getTaskMemory(id);
        if (!existing)
            return null;
        const now = new Date();
        const evolution = {
            timestamp: now,
            changeType: 'updated',
            previousValue: existing,
            newValue: updates,
            author: 'system'
        };
        const updated = {
            ...existing,
            ...updates,
            id, // Ensure ID doesn't change
            metadata: {
                ...existing.metadata,
                ...updates.metadata,
                updatedAt: now
            },
            evolution: [...existing.evolution, evolution]
        };
        await this.redis.set(key, JSON.stringify(updated));
        await this.updateTaskIndexes(updated, existing);
        await this.clearCache(`tasks:${id}`);
        return updated;
    }
    async getTaskMemory(id) {
        const key = this.getKey('tasks', id);
        // Check cache first
        const cached = await this.getCache(key);
        if (cached)
            return cached;
        const data = await this.redis.get(key);
        if (!data)
            return null;
        const task = JSON.parse(data);
        // Update access metadata
        task.metadata.lastAccessedAt = new Date();
        task.metadata.accessCount++;
        await this.redis.set(key, JSON.stringify(task));
        await this.setCache(key, task);
        return task;
    }
    async deleteTaskMemory(id) {
        const task = await this.getTaskMemory(id);
        if (!task)
            return false;
        const key = this.getKey('tasks', id);
        await this.redis.del(key);
        // Remove from indexes
        await this.removeTaskFromIndexes(task);
        // Clear cache
        await this.clearCache(`tasks:${id}`);
        return true;
    }
    async updateTaskIndexes(task, previousTask) {
        // Category index
        const categoryKey = `${this.namespace}:indexes:tasks:by_category:${task.category}`;
        await this.redis.sadd(categoryKey, [task.id]);
        // Project index
        if (task.projectId) {
            const projectKey = `${this.namespace}:indexes:tasks:by_project:${task.projectId}`;
            await this.redis.sadd(projectKey, [task.id]);
        }
        // Tag indexes
        for (const tag of task.tags) {
            const tagKey = `${this.namespace}:indexes:tasks:by_tag:${tag}`;
            await this.redis.sadd(tagKey, [task.id]);
        }
        // Status index
        const statusKey = `${this.namespace}:indexes:tasks:by_status:${task.status}`;
        await this.redis.sadd(statusKey, [task.id]);
        // Priority index
        const priorityKey = `${this.namespace}:indexes:tasks:by_priority:${task.priority}`;
        await this.redis.sadd(priorityKey, [task.id]);
        // Time-based index (for recent tasks)
        const timeKey = `${this.namespace}:indexes:tasks:by_time`;
        await this.redis.zadd(timeKey, task.metadata.updatedAt.getTime(), task.id);
        // Clean up old indexes if task was updated
        if (previousTask) {
            await this.removeTaskFromIndexes(previousTask, task);
        }
    }
    async removeTaskFromIndexes(task, excludeTask) {
        // Implementation would remove task from all relevant indexes
        // This is a simplified version - full implementation would handle all index types
    }
    // Project Context Management
    async createProjectContext(project) {
        const id = this.generateId('project');
        const now = new Date();
        const projectContext = {
            ...project,
            id,
            metadata: {
                createdAt: now,
                updatedAt: now,
                lastActiveAt: now,
                totalTasks: 0,
                completedTasks: 0
            },
            insights: []
        };
        const key = this.getKey('projects', id);
        await this.redis.set(key, JSON.stringify(projectContext));
        return projectContext;
    }
    async updateProjectContext(id, updates) {
        const key = this.getKey('projects', id);
        const existing = await this.getProjectContext(id);
        if (!existing)
            return null;
        const updated = {
            ...existing,
            ...updates,
            id,
            metadata: {
                ...existing.metadata,
                ...updates.metadata,
                updatedAt: new Date()
            }
        };
        await this.redis.set(key, JSON.stringify(updated));
        await this.clearCache(`projects:${id}`);
        return updated;
    }
    async getProjectContext(id) {
        const key = this.getKey('projects', id);
        const cached = await this.getCache(key);
        if (cached)
            return cached;
        const data = await this.redis.get(key);
        if (!data)
            return null;
        const project = JSON.parse(data);
        await this.setCache(key, project);
        return project;
    }
    async addProjectInsight(projectId, insight) {
        const project = await this.getProjectContext(projectId);
        if (!project)
            return;
        const newInsight = {
            ...insight,
            timestamp: new Date()
        };
        project.insights.push(newInsight);
        await this.updateProjectContext(projectId, { insights: project.insights });
    }
    // Knowledge Pattern Management
    async createKnowledgePattern(pattern) {
        const id = this.generateId('pattern');
        const now = new Date();
        const knowledgePattern = {
            ...pattern,
            id,
            metadata: {
                discoveredAt: now,
                lastReinforced: now,
                reinforcementCount: 1,
                applicabilityScore: pattern.confidence
            },
            evolution: [{
                    timestamp: now,
                    changeType: 'discovered',
                    evidence: 'Initial pattern discovery',
                    impactScore: pattern.confidence
                }]
        };
        const key = this.getKey('patterns', id);
        await this.redis.set(key, JSON.stringify(knowledgePattern));
        // Update pattern indexes
        await this.updatePatternIndexes(knowledgePattern);
        return knowledgePattern;
    }
    async reinforcePattern(id, evidence, successRate) {
        const pattern = await this.getKnowledgePattern(id);
        if (!pattern)
            return null;
        const now = new Date();
        const reinforcement = {
            timestamp: now,
            changeType: 'reinforced',
            evidence,
            impactScore: successRate
        };
        // Update confidence based on success rate
        const newConfidence = (pattern.confidence * 0.8) + (successRate * 0.2);
        const updated = {
            ...pattern,
            confidence: newConfidence,
            metadata: {
                ...pattern.metadata,
                lastReinforced: now,
                reinforcementCount: pattern.metadata.reinforcementCount + 1,
                applicabilityScore: newConfidence
            },
            evidence: {
                ...pattern.evidence,
                examples: [...pattern.evidence.examples, evidence].slice(-10), // Keep last 10 examples
                successRate: ((pattern.evidence.successRate * pattern.metadata.reinforcementCount) + successRate) / (pattern.metadata.reinforcementCount + 1),
                usageFrequency: pattern.evidence.usageFrequency + 1
            },
            evolution: [...pattern.evolution, reinforcement]
        };
        const key = this.getKey('patterns', id);
        await this.redis.set(key, JSON.stringify(updated));
        await this.clearCache(`patterns:${id}`);
        return updated;
    }
    async getKnowledgePattern(id) {
        const key = this.getKey('patterns', id);
        const cached = await this.getCache(key);
        if (cached)
            return cached;
        const data = await this.redis.get(key);
        if (!data)
            return null;
        const pattern = JSON.parse(data);
        await this.setCache(key, pattern);
        return pattern;
    }
    async updatePatternIndexes(pattern) {
        // Category index
        const categoryKey = `${this.namespace}:indexes:patterns:by_category:${pattern.category}`;
        await this.redis.sadd(categoryKey, [pattern.id]);
        // Confidence index (sorted set)
        const confidenceKey = `${this.namespace}:indexes:patterns:by_confidence`;
        await this.redis.zadd(confidenceKey, pattern.confidence, pattern.id);
        // Usage frequency index
        const usageKey = `${this.namespace}:indexes:patterns:by_usage`;
        await this.redis.zadd(usageKey, pattern.evidence.usageFrequency, pattern.id);
    }
    // Session Memory Management
    async createSession(context) {
        const sessionId = this.generateId('session');
        const now = new Date();
        const session = {
            sessionId,
            startTime: now,
            context,
            interactions: [],
            temporaryData: {},
            insights: []
        };
        const key = this.getKey('sessions', sessionId);
        await this.redis.set(key, JSON.stringify(session), { ex: 86400 }); // 24 hour TTL
        return session;
    }
    async updateSession(sessionId, updates) {
        const key = this.getKey('sessions', sessionId);
        const existing = await this.getSession(sessionId);
        if (!existing)
            return null;
        const updated = {
            ...existing,
            ...updates,
            sessionId
        };
        await this.redis.set(key, JSON.stringify(updated), { ex: 86400 });
        return updated;
    }
    async getSession(sessionId) {
        const key = this.getKey('sessions', sessionId);
        const data = await this.redis.get(key);
        if (!data)
            return null;
        return JSON.parse(data);
    }
    async addSessionInteraction(sessionId, interaction) {
        const session = await this.getSession(sessionId);
        if (!session)
            return;
        const newInteraction = {
            ...interaction,
            timestamp: new Date()
        };
        session.interactions.push(newInteraction);
        await this.updateSession(sessionId, { interactions: session.interactions });
    }
    async endSession(sessionId, summary) {
        const session = await this.getSession(sessionId);
        if (!session)
            return;
        await this.updateSession(sessionId, {
            endTime: new Date(),
            summary
        });
        // Archive session for long-term analysis
        const archiveKey = this.getKey('sessions:archive', sessionId);
        await this.redis.set(archiveKey, JSON.stringify(session));
    }
    // Search and Retrieval
    async searchTasks(criteria) {
        const startTime = Date.now();
        let taskIds = new Set();
        let allTaskIds = [];
        // If no specific criteria, get all tasks
        if (!criteria.category && !criteria.tags && !criteria.projectId && !criteria.status && !criteria.priority) {
            const pattern = `${this.namespace}:tasks:*`;
            const keys = await this.redis.keys(pattern);
            allTaskIds = keys.map(key => key.split(':').pop());
        }
        else {
            // Build intersection of different criteria
            const indexSets = [];
            if (criteria.category) {
                for (const category of criteria.category) {
                    const key = `${this.namespace}:indexes:tasks:by_category:${category}`;
                    const ids = await this.redis.smembers(key);
                    indexSets.push(ids);
                }
            }
            if (criteria.tags) {
                for (const tag of criteria.tags) {
                    const key = `${this.namespace}:indexes:tasks:by_tag:${tag}`;
                    const ids = await this.redis.smembers(key);
                    indexSets.push(ids);
                }
            }
            if (criteria.projectId) {
                const key = `${this.namespace}:indexes:tasks:by_project:${criteria.projectId}`;
                const ids = await this.redis.smembers(key);
                indexSets.push(ids);
            }
            if (criteria.status) {
                const statusIds = [];
                for (const status of criteria.status) {
                    const key = `${this.namespace}:indexes:tasks:by_status:${status}`;
                    const ids = await this.redis.smembers(key);
                    statusIds.push(...ids);
                }
                indexSets.push(statusIds);
            }
            if (criteria.priority) {
                const priorityIds = [];
                for (const priority of criteria.priority) {
                    const key = `${this.namespace}:indexes:tasks:by_priority:${priority}`;
                    const ids = await this.redis.smembers(key);
                    priorityIds.push(...ids);
                }
                indexSets.push(priorityIds);
            }
            // Find intersection of all index sets
            if (indexSets.length > 0) {
                allTaskIds = indexSets.reduce((acc, curr) => acc.filter(id => curr.includes(id)));
            }
        }
        // Apply additional filters
        const tasks = [];
        for (const id of allTaskIds) {
            const task = await this.getTaskMemory(id);
            if (!task)
                continue;
            // Text search
            if (criteria.query) {
                const searchText = criteria.query.toLowerCase();
                const matchesQuery = task.title.toLowerCase().includes(searchText) ||
                    task.description.toLowerCase().includes(searchText) ||
                    task.content.originalRequest.toLowerCase().includes(searchText) ||
                    task.content.solution.toLowerCase().includes(searchText) ||
                    task.tags.some(tag => tag.toLowerCase().includes(searchText));
                if (!matchesQuery)
                    continue;
            }
            // Date range filter
            if (criteria.dateRange) {
                const taskDate = new Date(task.metadata.updatedAt);
                if (taskDate < criteria.dateRange.start || taskDate > criteria.dateRange.end) {
                    continue;
                }
            }
            tasks.push(task);
        }
        // Apply pagination
        const offset = criteria.offset || 0;
        const limit = criteria.limit || 50;
        const paginatedTasks = tasks.slice(offset, offset + limit);
        // Calculate facets
        const facets = {};
        if (tasks.length > 0) {
            facets.categories = tasks.reduce((acc, task) => {
                acc[task.category] = (acc[task.category] || 0) + 1;
                return acc;
            }, {});
            facets.statuses = tasks.reduce((acc, task) => {
                acc[task.status] = (acc[task.status] || 0) + 1;
                return acc;
            }, {});
        }
        return {
            items: paginatedTasks,
            totalCount: tasks.length,
            facets,
            executionTime: Date.now() - startTime
        };
    }
    async findSimilarTasks(taskId, threshold = 0.7, maxResults = 10) {
        const referenceTask = await this.getTaskMemory(taskId);
        if (!referenceTask)
            return [];
        // Simple similarity based on tags and category
        // In a production system, this would use vector embeddings
        const allTasks = await this.searchTasks({});
        const similarities = [];
        for (const task of allTasks.items) {
            if (task.id === taskId)
                continue;
            let score = 0;
            // Category match
            if (task.category === referenceTask.category) {
                score += 0.3;
            }
            // Tag overlap
            const commonTags = task.tags.filter(tag => referenceTask.tags.includes(tag));
            score += (commonTags.length / Math.max(task.tags.length, referenceTask.tags.length)) * 0.4;
            // Project match
            if (task.projectId && task.projectId === referenceTask.projectId) {
                score += 0.3;
            }
            if (score >= threshold) {
                similarities.push({ task, score });
            }
        }
        // Sort by score and return top results
        return similarities
            .sort((a, b) => b.score - a.score)
            .slice(0, maxResults)
            .map(item => item.task);
    }
    async searchPatterns(category, minConfidence) {
        let patternIds = [];
        if (category) {
            const key = `${this.namespace}:indexes:patterns:by_category:${category}`;
            patternIds = await this.redis.smembers(key);
        }
        else {
            const pattern = `${this.namespace}:patterns:*`;
            const keys = await this.redis.keys(pattern);
            patternIds = keys.map(key => key.split(':').pop());
        }
        const patterns = [];
        for (const id of patternIds) {
            const pattern = await this.getKnowledgePattern(id);
            if (pattern && (!minConfidence || pattern.confidence >= minConfidence)) {
                patterns.push(pattern);
            }
        }
        return patterns.sort((a, b) => b.confidence - a.confidence);
    }
    // Analytics and Insights
    async getMemoryStats() {
        const taskPattern = `${this.namespace}:tasks:*`;
        const projectPattern = `${this.namespace}:projects:*`;
        const patternPattern = `${this.namespace}:patterns:*`;
        const [taskKeys, projectKeys, patternKeys] = await Promise.all([
            this.redis.keys(taskPattern),
            this.redis.keys(projectPattern),
            this.redis.keys(patternPattern)
        ]);
        // Get most accessed tasks
        const timeKey = `${this.namespace}:indexes:tasks:by_time`;
        const recentTaskIds = await this.redis.zrange(timeKey, -10, -1);
        return {
            totalTasks: taskKeys.length,
            totalProjects: projectKeys.length,
            totalPatterns: patternKeys.length,
            storageUsed: 0, // Would calculate actual storage in production
            averageAccessTime: 0, // Would track actual access times
            mostAccessedMemories: recentTaskIds,
            recentActivity: new Date()
        };
    }
    async generateProjectReport(projectId) {
        const project = await this.getProjectContext(projectId);
        if (!project)
            return 'Project not found';
        const projectTasks = await this.searchTasks({ projectId });
        const completedTasks = projectTasks.items.filter(t => t.status === LongTermMemoryTypes_1.TaskStatus.COMPLETED);
        const activeTasks = projectTasks.items.filter(t => t.status === LongTermMemoryTypes_1.TaskStatus.IN_PROGRESS);
        const report = `
# Project Report: ${project.name}

## Overview
- **Status**: ${project.status}
- **Category**: ${project.category}
- **Created**: ${project.metadata.createdAt.toISOString()}
- **Last Active**: ${project.metadata.lastActiveAt.toISOString()}

## Progress
- **Total Tasks**: ${projectTasks.totalCount}
- **Completed**: ${completedTasks.length}
- **In Progress**: ${activeTasks.length}
- **Completion Rate**: ${((completedTasks.length / projectTasks.totalCount) * 100).toFixed(1)}%

## Technologies
${project.configuration.technologies.map(t => `- ${t}`).join('\n')}

## Recent Insights
${project.insights.slice(-5).map(i => `- [${i.type}] ${i.title}: ${i.description}`).join('\n')}

## Key Learnings
${completedTasks.flatMap(t => t.content.learnings).slice(-10).map(l => `- ${l}`).join('\n')}
`;
        return report;
    }
    // Utility Methods for Memory Management
    async exportMemory(type, format = 'json') {
        const pattern = `${this.namespace}:${type}:*`;
        const keys = await this.redis.keys(pattern);
        const items = [];
        for (const key of keys) {
            const data = await this.redis.get(key);
            if (data) {
                items.push(JSON.parse(data));
            }
        }
        if (format === 'json') {
            return JSON.stringify(items, null, 2);
        }
        else {
            // Simple CSV export - would be more sophisticated in production
            if (items.length === 0)
                return '';
            const headers = Object.keys(items[0]).filter(k => typeof items[0][k] !== 'object');
            const csv = [
                headers.join(','),
                ...items.map(item => headers.map(h => JSON.stringify(item[h] || '')).join(','))
            ].join('\n');
            return csv;
        }
    }
    async importMemory(type, data, format = 'json') {
        let items = [];
        if (format === 'json') {
            items = JSON.parse(data);
        }
        else {
            // Simple CSV import - would be more sophisticated in production
            const lines = data.split('\n');
            if (lines.length < 2)
                return 0;
            const headers = lines[0].split(',');
            items = lines.slice(1).map(line => {
                const values = line.split(',');
                const item = {};
                headers.forEach((h, i) => {
                    item[h] = JSON.parse(values[i] || '""');
                });
                return item;
            });
        }
        let imported = 0;
        for (const item of items) {
            const key = this.getKey(type, item.id);
            await this.redis.set(key, JSON.stringify(item));
            imported++;
        }
        return imported;
    }
    async cleanupOldMemories(daysToKeep = 90) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
        const taskPattern = `${this.namespace}:tasks:*`;
        const keys = await this.redis.keys(taskPattern);
        let deleted = 0;
        for (const key of keys) {
            const data = await this.redis.get(key);
            if (data) {
                const task = JSON.parse(data);
                if (task.status === LongTermMemoryTypes_1.TaskStatus.ARCHIVED &&
                    new Date(task.metadata.updatedAt) < cutoffDate) {
                    await this.redis.del(key);
                    deleted++;
                }
            }
        }
        return deleted;
    }
}
exports.LongTermMemoryManager = LongTermMemoryManager;
// Export helper function to create a Redis client with Context7 MCP
async function createRedisClient(mcpServerName = 'redis') {
    // For now, returning a mock implementation
    return {
        get: async (key) => null,
        set: async (key, value, options) => { },
        del: async (key) => { },
        exists: async (key) => false,
        keys: async (pattern) => [],
        mget: async (keys) => keys.map(() => null),
        mset: async (keyValues) => { },
        incr: async (key) => 0,
        expire: async (key, seconds) => { },
        zadd: async (key, score, member) => { },
        zrange: async (key, start, stop) => [],
        zrangebyscore: async (key, min, max) => [],
        hset: async (key, field, value) => { },
        hget: async (key, field) => null,
        hgetall: async (key) => ({}),
        sadd: async (key, members) => { },
        smembers: async (key) => [],
        sinter: async (keys) => []
        // Ensure all methods from the RedisClient interface are mocked
    };
}
// Usage Example
async function exampleUsage() {
    // Initialize the memory manager
    const redis = await createRedisClient();
    const memoryManager = new LongTermMemoryManager(redis);
    // Create a new task memory
    const task = await memoryManager.createTaskMemory({
        title: 'Implement authentication system',
        description: 'Add JWT-based authentication to the API',
        category: LongTermMemoryTypes_1.MemoryCategory.PROJECT,
        projectId: 'project_123',
        status: LongTermMemoryTypes_1.TaskStatus.IN_PROGRESS,
        priority: LongTermMemoryTypes_1.Priority.HIGH,
        tags: ['authentication', 'security', 'api'],
        content: {
            originalRequest: 'Add secure authentication to our REST API',
            solution: 'Implement JWT tokens with refresh token rotation',
            codeSnippets: [{
                    language: 'typescript',
                    code: 'const jwt = require("jsonwebtoken");',
                    description: 'JWT library import'
                }],
            resources: [{
                    type: 'documentation',
                    name: 'JWT Best Practices',
                    location: 'https://jwt.io/introduction/',
                    description: 'Official JWT documentation'
                }],
            learnings: [
                'Always use HTTPS for token transmission',
                'Implement token expiration and refresh',
                'Store sensitive data in environment variables'
            ]
        },
        relationships: {
            relatedTasks: [],
            dependencies: ['task_456'],
            blockedBy: [],
            childTasks: []
        }
    });
    console.log('Created task:', task.id);
    // Search for tasks
    const searchResults = await memoryManager.searchTasks({
        query: 'authentication',
        category: [LongTermMemoryTypes_1.MemoryCategory.PROJECT],
        status: [LongTermMemoryTypes_1.TaskStatus.IN_PROGRESS]
    });
    console.log('Found tasks:', searchResults.totalCount);
    // Create a knowledge pattern
    const pattern = await memoryManager.createKnowledgePattern({
        name: 'JWT Authentication Pattern',
        description: 'Standard pattern for implementing JWT authentication',
        category: LongTermMemoryTypes_1.PatternCategory.DESIGN_PATTERN,
        confidence: 0.85,
        pattern: {
            trigger: {
                conditions: ['Need for stateless authentication', 'REST API security'],
                keywords: ['authentication', 'jwt', 'token', 'security'],
                context: ['API development', 'Microservices']
            },
            context: {
                applicableScenarios: ['REST APIs', 'Microservices', 'Mobile backends'],
                prerequisites: ['HTTPS enabled', 'User database', 'Secret key management'],
                limitations: ['Token size limits', 'Stateless nature', 'Revocation complexity']
            },
            solution: {
                approach: 'Use JWT tokens with proper expiration and refresh mechanism',
                implementation: 'Implement middleware for token validation',
                steps: [
                    'Generate JWT on successful login',
                    'Include token in Authorization header',
                    'Validate token on each request',
                    'Implement refresh token rotation'
                ]
            },
            variations: []
        },
        evidence: {
            examples: ['task_123'],
            successRate: 0.85,
            usageFrequency: 1,
            relatedPatterns: []
        }
    });
    console.log('Created pattern:', pattern.id);
    // Generate project report
    const report = await memoryManager.generateProjectReport('project_123');
    console.log('Project Report:\n', report);
}
//# sourceMappingURL=LongTermMemoryManagerClean.js.map