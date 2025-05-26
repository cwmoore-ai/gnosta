/**
 * Long-Term Memory Manager for Gnosta.ai
 * 
 * A comprehensive memory system using redis-local (Docker, port 6379, C:\Dev\redis-data) + Upstash Redis for persistent,
 * queryable memory that survives across sessions and contexts.
 * 
 * @author Gnosta.ai Development Team
 * @version 1.0.0
 */

import * as Redis from 'redis';
console.log('Imported Redis module:', Redis); // Log the entire module
// Type Definitions and Interfaces

export enum MemoryCategory {
  PERSONAL = 'personal',
  PROJECT = 'project',
  LEARNING = 'learning',
  SYSTEM = 'system',
  PATTERN = 'pattern',
  REFERENCE = 'reference'
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
  FAILED = 'failed',
  BLOCKED = 'blocked'
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum ProjectCategory {
  WEB_DEVELOPMENT = 'web_development',
  API_DEVELOPMENT = 'api_development',
  DATA_SCIENCE = 'data_science',
  AUTOMATION = 'automation',
  INFRASTRUCTURE = 'infrastructure',
  DOCUMENTATION = 'documentation',
  OTHER = 'other'
}

export enum ProjectStatus {
  PLANNING = 'planning',
  ACTIVE = 'active',
  MAINTENANCE = 'maintenance',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
  ON_HOLD = 'on_hold'
}

export enum PatternCategory {
  DESIGN_PATTERN = 'design_pattern',
  CODE_PATTERN = 'code_pattern',
  WORKFLOW_PATTERN = 'workflow_pattern',
  ERROR_PATTERN = 'error_pattern',
  OPTIMIZATION_PATTERN = 'optimization_pattern',
  INTEGRATION_PATTERN = 'integration_pattern'
}

export interface CodeSnippet {
  language: string;
  code: string;
  description?: string;
  filename?: string;
  lineNumbers?: [number, number];
}

export interface Resource {
  type: 'url' | 'file' | 'documentation' | 'tool' | 'library';
  name: string;
  location: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface MemoryEvolution {
  timestamp: Date;
  changeType: 'created' | 'updated' | 'status_changed' | 'relationship_added' | 'content_modified';
  previousValue?: any;
  newValue?: any;
  reason?: string;
  author?: string;
}

export interface TaskMemory {
  id: string;
  title: string;
  description: string;
  category: MemoryCategory;
  projectId?: string;
  status: TaskStatus;
  priority: Priority;
  tags: string[];
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    lastAccessedAt: Date;
    accessCount: number;
    source: string;
    context: Record<string, any>;
  };
  content: {
    originalRequest: string;
    solution: string;
    codeSnippets: CodeSnippet[];
    resources: Resource[];
    learnings: string[];
  };
  relationships: {
    relatedTasks: string[];
    dependencies: string[];
    blockedBy: string[];
    parentTask?: string;
    childTasks: string[];
  };
  evolution: MemoryEvolution[];
}

export interface ProjectInsight {
  type: 'performance' | 'pattern' | 'issue' | 'recommendation';
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high';
  timestamp: Date;
  data?: Record<string, any>;
}

export interface ProjectContext {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    lastActiveAt: Date;
    totalTasks: number;
    completedTasks: number;
  };
  configuration: {
    technologies: string[];
    frameworks: string[];
    patterns: string[];
    conventions: string[];
  };
  structure: {
    directories: string[];
    keyFiles: string[];
    entryPoints: string[];
  };
  relationships: {
    relatedProjects: string[];
    dependencies: string[];
    sharedComponents: string[];
  };
  insights: ProjectInsight[];
}

export interface PatternTrigger {
  conditions: string[];
  keywords: string[];
  context: string[];
}

export interface PatternContext {
  applicableScenarios: string[];
  prerequisites: string[];
  limitations: string[];
}

export interface PatternSolution {
  approach: string;
  implementation: string;
  codeTemplate?: CodeSnippet;
  steps: string[];
}

export interface PatternVariation {
  name: string;
  description: string;
  whenToUse: string;
  modifications: string[];
}

export interface PatternEvolution {
  timestamp: Date;
  changeType: 'discovered' | 'reinforced' | 'modified' | 'deprecated';
  evidence: string;
  impactScore: number;
}

export interface KnowledgePattern {
  id: string;
  name: string;
  description: string;
  category: PatternCategory;
  confidence: number;
  metadata: {
    discoveredAt: Date;
    lastReinforced: Date;
    reinforcementCount: number;
    applicabilityScore: number;
  };
  pattern: {
    trigger: PatternTrigger;
    context: PatternContext;
    solution: PatternSolution;
    variations: PatternVariation[];
  };
  evidence: {
    examples: string[];
    successRate: number;
    usageFrequency: number;
    relatedPatterns: string[];
  };
  evolution: PatternEvolution[];
}

export interface SessionInteraction {
  timestamp: Date;
  type: 'command' | 'query' | 'response' | 'error';
  content: string;
  metadata?: Record<string, any>;
}

export interface SessionInsight {
  type: 'learning' | 'pattern' | 'issue' | 'achievement';
  description: string;
  timestamp: Date;
  relevance: number;
}

export interface SessionSummary {
  tasksCompleted: number;
  patternsDiscovered: number;
  errorsEncountered: number;
  keyLearnings: string[];
  recommendations: string[];
}

export interface SessionMemory {
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  context: {
    mode: string;
    currentProject?: string;
    activeTask?: string;
    workingDirectory: string;
    environment: Record<string, string>;
  };
  interactions: SessionInteraction[];
  temporaryData: Record<string, any>;
  insights: SessionInsight[];
  summary?: SessionSummary;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface SimilaritySearch {
  referenceId: string;
  threshold: number;
  maxResults?: number;
}

export interface RelationshipQuery {
  type: 'parent' | 'child' | 'dependency' | 'related';
  depth?: number;
  includeIndirect?: boolean;
}

export interface SearchCriteria {
  query?: string;
  category?: MemoryCategory[];
  tags?: string[];
  projectId?: string;
  dateRange?: DateRange;
  priority?: Priority[];
  status?: TaskStatus[];
  similarity?: SimilaritySearch;
  relationships?: RelationshipQuery;
  limit?: number;
  offset?: number;
}

export interface SearchResult<T> {
  items: T[];
  totalCount: number;
  facets?: {
    categories: Record<string, number>;
    statuses: Record<string, number>;
  };
  executionTime: number;
}

export interface MemoryStats {
  totalTasks: number;
  totalProjects: number;
  totalPatterns: number;
  storageUsed: number;
  averageAccessTime: number;
  mostAccessedMemories: string[];
  recentActivity: Date;
}

// Redis Client Interface (to be implemented with redis-local MCP or direct connection)
interface RedisClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, options?: { EX?: number }): Promise<string | null>;
  del(key: string | string[]): Promise<number>;
  exists(keys: string | string[]): Promise<number>;
  keys(pattern: string): Promise<string[]>;
  mGet(keys: string[]): Promise<(string | null)[]>;
  mSet(keyValues: Record<string, string>): Promise<string>;
  incr(key: string): Promise<number>;
  expire(key: string, seconds: number): Promise<boolean>;
  zAdd(key: string, members: { score: number; value: string } | Array<{ score: number; value: string }>, options?: { INCR?: boolean }): Promise<number>;
  zRange(key: string, start: number | string, stop: number | string, options?: { BY?: 'SCORE' | 'LEX'; REV?: boolean; LIMIT?: { offset: number; count: number }; 'WITH SCORES'?: boolean }): Promise<string[] | Record<string, string>>;
  zRangeByScore(key: string, min: number | string, max: number | string, options?: { WITHSCORES?: boolean; LIMIT?: { offset: number; count: number } }): Promise<string[]>;
  hSet(key: string, field: string, value: string): Promise<number>;
  hSet(key: string, value: Record<string, string>): Promise<number>; // Overload
  hGet(key: string, field: string): Promise<string | undefined>;
  hGetAll(key: string): Promise<Record<string, string>>;
  sAdd(key: string, members: string | string[]): Promise<number>;
  sMembers(key: string): Promise<string[]>;
  sInter(keys: string | string[]): Promise<string[]>;
  connect(): Promise<void>;
  quit(): Promise<void>;
  on(event: string, listener: (...args: any[]) => void): void;
}
/**
 * Main Long-Term Memory Manager Class
 */
export class LongTermMemoryManager {
  private redis: RedisClient;
  private namespace: string;
  private cacheEnabled: boolean;
  private cache: Map<string, { data: any; expiry: number }>;

  constructor(redisClient: RedisClient, namespace: string = 'memory', cacheEnabled: boolean = true) {
    this.redis = redisClient;
    this.namespace = namespace;
    this.cacheEnabled = cacheEnabled;
    this.cache = new Map();
  }

  // Utility Methods

  private generateId(prefix: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    return `${prefix}_${timestamp}_${random}`;
  }

  private getKey(type: string, id: string): string {
    return `${this.namespace}:${type}:${id}`;
  }

  private async setCache(key: string, data: any, ttl: number = 300): Promise<void> {
    if (this.cacheEnabled) {
      this.cache.set(key, {
        data,
        expiry: Date.now() + (ttl * 1000)
      });
    }
  }

  private async getCache(key: string): Promise<any | null> {
    if (!this.cacheEnabled) return null;
    
    const cached = this.cache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }
    
    this.cache.delete(key);
    return null;
  }

  private async clearCache(pattern?: string): Promise<void> {
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

  async createTaskMemory(task: Omit<TaskMemory, 'id' | 'metadata' | 'evolution'>): Promise<TaskMemory> {
    const id = this.generateId('task');
    const now = new Date();
    
    const taskMemory: TaskMemory = {
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

  async updateTaskMemory(id: string, updates: Partial<TaskMemory>): Promise<TaskMemory | null> {
    const key = this.getKey('tasks', id);
    const existing = await this.getTaskMemory(id);
    
    if (!existing) return null;

    const now = new Date();
    const evolution: MemoryEvolution = {
      timestamp: now,
      changeType: 'updated',
      previousValue: existing,
      newValue: updates,
      author: 'system'
    };

    const updated: TaskMemory = {
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

  async getTaskMemory(id: string): Promise<TaskMemory | null> {
    const key = this.getKey('tasks', id);
    
    // Check cache first
    const cached = await this.getCache(key);
    if (cached) return cached;

    const data = await this.redis.get(key);
    if (!data) return null;

    const task = JSON.parse(data) as TaskMemory;

    // Rehydrate date fields
    if (task.metadata) {
      if (task.metadata.createdAt) {
        task.metadata.createdAt = new Date(task.metadata.createdAt);
      }
      if (task.metadata.updatedAt) {
        task.metadata.updatedAt = new Date(task.metadata.updatedAt);
      }
      // lastAccessedAt is updated below, so it will be a Date object.
    }
    if (task.evolution && Array.isArray(task.evolution)) {
      task.evolution.forEach(event => {
        if (event.timestamp) {
          event.timestamp = new Date(event.timestamp);
        }
      });
    }
    
    // Update access metadata
    task.metadata.lastAccessedAt = new Date(); // This ensures it's a Date object
    task.metadata.accessCount++;
    
    // Note: Storing it back immediately after getting might not be necessary
    // if the only change is access count and lastAccessedAt for read operations.
    // However, if rehydration is done, it's good to cache the rehydrated object.
    // For consistency with current pattern, we'll keep the set operation.
    await this.redis.set(key, JSON.stringify(task));
    await this.setCache(key, task);

    return task;
  }

  async deleteTaskMemory(id: string): Promise<boolean> {
    const task = await this.getTaskMemory(id);
    if (!task) return false;

    const key = this.getKey('tasks', id);
    await this.redis.del(key);
    
    // Remove from indexes
    await this.removeTaskFromIndexes(task);
    
    // Clear cache
    await this.clearCache(`tasks:${id}`);

    return true;
  }

  private async updateTaskIndexes(task: TaskMemory, previousTask?: TaskMemory): Promise<void> {
    // Category index
    const categoryKey = `${this.namespace}:indexes:tasks:by_category:${task.category}`;
    await this.redis.sAdd(categoryKey, task.id);

    // Project index
    if (task.projectId) {
      const projectKey = `${this.namespace}:indexes:tasks:by_project:${task.projectId}`;
      await this.redis.sAdd(projectKey, task.id);
    }

    // Tag indexes
    for (const tag of task.tags) {
      const tagKey = `${this.namespace}:indexes:tasks:by_tag:${tag}`;
      await this.redis.sAdd(tagKey, task.id);
    }

    // Status index
    const statusKey = `${this.namespace}:indexes:tasks:by_status:${task.status}`;
    await this.redis.sAdd(statusKey, task.id);

    // Priority index
    const priorityKey = `${this.namespace}:indexes:tasks:by_priority:${task.priority}`;
    await this.redis.sAdd(priorityKey, task.id);

    // Time-based index (for recent tasks)
    const timeKey = `${this.namespace}:indexes:tasks:by_time`;
    await this.redis.zAdd(timeKey, { score: task.metadata.updatedAt.getTime(), value: task.id });

    // Clean up old indexes if task was updated
    if (previousTask) {
      await this.removeTaskFromIndexes(previousTask, task);
    }
  }

  private async removeTaskFromIndexes(task: TaskMemory, excludeTask?: TaskMemory): Promise<void> {
    // Implementation would remove task from all relevant indexes
    // This is a simplified version - full implementation would handle all index types
  }

  // Project Context Management

  async createProjectContext(project: Omit<ProjectContext, 'id' | 'metadata' | 'insights'>): Promise<ProjectContext> {
    const id = this.generateId('project');
    const now = new Date();
    
    const projectContext: ProjectContext = {
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

  async updateProjectContext(id: string, updates: Partial<ProjectContext>): Promise<ProjectContext | null> {
    const key = this.getKey('projects', id);
    const existing = await this.getProjectContext(id);
    
    if (!existing) return null;

    const updated: ProjectContext = {
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

  async getProjectContext(id: string): Promise<ProjectContext | null> {
    const key = this.getKey('projects', id);
    
    const cached = await this.getCache(key);
    if (cached) return cached;

    const data = await this.redis.get(key);
    if (!data) return null;

    const project = JSON.parse(data) as ProjectContext;

    // Rehydrate date fields
    if (project.metadata) {
      if (project.metadata.createdAt) {
        project.metadata.createdAt = new Date(project.metadata.createdAt);
      }
      if (project.metadata.updatedAt) {
        project.metadata.updatedAt = new Date(project.metadata.updatedAt);
      }
      if (project.metadata.lastActiveAt) {
        project.metadata.lastActiveAt = new Date(project.metadata.lastActiveAt);
      }
    }
    if (project.insights && Array.isArray(project.insights)) {
      project.insights.forEach(insight => {
        if (insight.timestamp) {
          insight.timestamp = new Date(insight.timestamp);
        }
      });
    }

    await this.setCache(key, project);

    return project;
  }

  async addProjectInsight(projectId: string, insight: Omit<ProjectInsight, 'timestamp'>): Promise<void> {
    const project = await this.getProjectContext(projectId);
    if (!project) return;

    const newInsight: ProjectInsight = {
      ...insight,
      timestamp: new Date()
    };

    project.insights.push(newInsight);
    await this.updateProjectContext(projectId, { insights: project.insights });
  }

  // Knowledge Pattern Management

  async createKnowledgePattern(pattern: Omit<KnowledgePattern, 'id' | 'metadata' | 'evolution'>): Promise<KnowledgePattern> {
    const id = this.generateId('pattern');
    const now = new Date();
    
    const knowledgePattern: KnowledgePattern = {
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

  async reinforcePattern(id: string, evidence: string, successRate: number): Promise<KnowledgePattern | null> {
    const pattern = await this.getKnowledgePattern(id);
    if (!pattern) return null;

    const now = new Date();
    const reinforcement: PatternEvolution = {
      timestamp: now,
      changeType: 'reinforced',
      evidence,
      impactScore: successRate
    };

    // Update confidence based on success rate
    const newConfidence = (pattern.confidence * 0.8) + (successRate * 0.2);

    const updated: KnowledgePattern = {
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

  async getKnowledgePattern(id: string): Promise<KnowledgePattern | null> {
    const key = this.getKey('patterns', id);
    
    const cached = await this.getCache(key);
    if (cached) return cached;

    const data = await this.redis.get(key);
    if (!data) return null;

    const pattern = JSON.parse(data) as KnowledgePattern;

    // Rehydrate date fields
    if (pattern.metadata) {
      if (pattern.metadata.discoveredAt) {
        pattern.metadata.discoveredAt = new Date(pattern.metadata.discoveredAt);
      }
      if (pattern.metadata.lastReinforced) {
        pattern.metadata.lastReinforced = new Date(pattern.metadata.lastReinforced);
      }
    }
    if (pattern.evolution && Array.isArray(pattern.evolution)) {
      pattern.evolution.forEach(event => {
        if (event.timestamp) {
          event.timestamp = new Date(event.timestamp);
        }
      });
    }

    await this.setCache(key, pattern);

    return pattern;
  }

  private async updatePatternIndexes(pattern: KnowledgePattern): Promise<void> {
    // Category index
    const categoryKey = `${this.namespace}:indexes:patterns:by_category:${pattern.category}`;
    await this.redis.sAdd(categoryKey, pattern.id);

    // Confidence index (sorted set)
    const confidenceKey = `${this.namespace}:indexes:patterns:by_confidence`;
    await this.redis.zAdd(confidenceKey, { score: pattern.confidence, value: pattern.id });

    // Usage frequency index
    const usageKey = `${this.namespace}:indexes:patterns:by_usage`;
    await this.redis.zAdd(usageKey, { score: pattern.evidence.usageFrequency, value: pattern.id });
  }

  // Session Memory Management

  async createSession(context: SessionMemory['context']): Promise<SessionMemory> {
    const sessionId = this.generateId('session');
    const now = new Date();
    
    const session: SessionMemory = {
      sessionId,
      startTime: now,
      context,
      interactions: [],
      temporaryData: {},
      insights: []
    };

    const key = this.getKey('sessions', sessionId);
    await this.redis.set(key, JSON.stringify(session), { EX: 86400 }); // 24 hour TTL

    return session;
  }

  async updateSession(sessionId: string, updates: Partial<SessionMemory>): Promise<SessionMemory | null> {
    const key = this.getKey('sessions', sessionId);
    const existing = await this.getSession(sessionId);
    
    if (!existing) return null;

    const updated: SessionMemory = {
      ...existing,
      ...updates,
      sessionId
    };

    await this.redis.set(key, JSON.stringify(updated), { EX: 86400 });
    return updated;
  }

  async getSession(sessionId: string): Promise<SessionMemory | null> {
    const key = this.getKey('sessions', sessionId);
    const data = await this.redis.get(key);
    
    if (!data) return null;
    return JSON.parse(data) as SessionMemory;
  }

  async addSessionInteraction(sessionId: string, interaction: Omit<SessionInteraction, 'timestamp'>): Promise<void> {
    const session = await this.getSession(sessionId);
    if (!session) return;

    const newInteraction: SessionInteraction = {
      ...interaction,
      timestamp: new Date()
    };

    session.interactions.push(newInteraction);
    await this.updateSession(sessionId, { interactions: session.interactions });
  }

  async endSession(sessionId: string, summary: SessionSummary): Promise<void> {
    const session = await this.getSession(sessionId);
    if (!session) return;

    await this.updateSession(sessionId, {
      endTime: new Date(),
      summary
    });

    // Archive session for long-term analysis
    const archiveKey = this.getKey('sessions:archive', sessionId);
    await this.redis.set(archiveKey, JSON.stringify(session));
  }

  // Search and Retrieval

  async searchTasks(criteria: SearchCriteria): Promise<SearchResult<TaskMemory>> {
    const startTime = Date.now();
    let taskIds: Set<string> = new Set();
    let allTaskIds: string[] = [];

    // If no specific criteria, get all tasks
    if (!criteria.category && !criteria.tags && !criteria.projectId && !criteria.status && !criteria.priority) {
      const pattern = `${this.namespace}:tasks:*`;
      const keys = await this.redis.keys(pattern);
      allTaskIds = keys.map(key => key.split(':').pop()!);
    } else {
      // Build intersection of different criteria
      const indexSets: string[][] = [];

      if (criteria.category) {
        for (const category of criteria.category) {
          const key = `${this.namespace}:indexes:tasks:by_category:${category}`;
          const ids = await this.redis.sMembers(key);
          indexSets.push(ids);
        }
      }

      if (criteria.tags) {
        for (const tag of criteria.tags) {
          const key = `${this.namespace}:indexes:tasks:by_tag:${tag}`;
          const ids = await this.redis.sMembers(key);
          indexSets.push(ids);
        }
      }

      if (criteria.projectId) {
        const key = `${this.namespace}:indexes:tasks:by_project:${criteria.projectId}`;
        const ids = await this.redis.sMembers(key);
        indexSets.push(ids);
      }

      if (criteria.status) {
        const statusIds: string[] = [];
        for (const status of criteria.status) {
          const key = `${this.namespace}:indexes:tasks:by_status:${status}`;
          const ids = await this.redis.sMembers(key);
          statusIds.push(...ids);
        }
        indexSets.push(statusIds);
      }

      if (criteria.priority) {
        const priorityIds: string[] = [];
        for (const priority of criteria.priority) {
          const key = `${this.namespace}:indexes:tasks:by_priority:${priority}`;
          const ids = await this.redis.sMembers(key);
          priorityIds.push(...ids);
        }
        indexSets.push(priorityIds);
      }

      // Find intersection of all index sets
      if (indexSets.length > 0) {
        allTaskIds = indexSets.reduce((acc, curr) => 
          acc.filter(id => curr.includes(id))
        );
      }
    }

    // Apply additional filters
    const tasks: TaskMemory[] = [];
    for (const id of allTaskIds) {
      const task = await this.getTaskMemory(id);
      if (!task) continue;

      // Text search
      if (criteria.query) {
        const searchText = criteria.query.toLowerCase();
        const matchesQuery = 
          task.title.toLowerCase().includes(searchText) ||
          task.description.toLowerCase().includes(searchText) ||
          task.content.originalRequest.toLowerCase().includes(searchText) ||
          task.content.solution.toLowerCase().includes(searchText) ||
          task.tags.some(tag => tag.toLowerCase().includes(searchText));
        
        if (!matchesQuery) continue;
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
    const calculatedFacets: { categories: Record<string, number>; statuses: Record<string, number> } = {
      categories: {},
      statuses: {}
    };

    if (tasks.length > 0) {
      calculatedFacets.categories = tasks.reduce((acc, task) => {
        acc[task.category] = (acc[task.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      calculatedFacets.statuses = tasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    }

    return {
      items: paginatedTasks,
      totalCount: tasks.length,
      facets: calculatedFacets,
      executionTime: Date.now() - startTime
    };
  }

  async findSimilarTasks(taskId: string, threshold: number = 0.7, maxResults: number = 10): Promise<TaskMemory[]> {
    const referenceTask = await this.getTaskMemory(taskId);
    if (!referenceTask) return [];

    // Simple similarity based on tags and category
    // In a production system, this would use vector embeddings
    const allTasks = await this.searchTasks({});
    const similarities: Array<{ task: TaskMemory; score: number }> = [];

    for (const task of allTasks.items) {
      if (task.id === taskId) continue;

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

  async searchPatterns(category?: PatternCategory, minConfidence?: number): Promise<KnowledgePattern[]> {
    let patternIds: string[] = [];

    if (category) {
      const key = `${this.namespace}:indexes:patterns:by_category:${category}`;
      patternIds = await this.redis.sMembers(key);
    } else {
      const pattern = `${this.namespace}:patterns:*`;
      const keys = await this.redis.keys(pattern);
      patternIds = keys.map(key => key.split(':').pop()!);
    }

    const patterns: KnowledgePattern[] = [];
    for (const id of patternIds) {
      const pattern = await this.getKnowledgePattern(id);
      if (pattern && (!minConfidence || pattern.confidence >= minConfidence)) {
        patterns.push(pattern);
      }
    }

    return patterns.sort((a, b) => b.confidence - a.confidence);
  }

  // Analytics and Insights

  async getMemoryStats(): Promise<MemoryStats> {
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
    const recentTaskIds = await this.redis.zRange(timeKey, -10, -1) as string[];

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

  async generateProjectReport(projectId: string): Promise<string> {
    const project = await this.getProjectContext(projectId);
    if (!project) return 'Project not found';

    const projectTasks = await this.searchTasks({ projectId });
    const completedTasks = projectTasks.items.filter(t => t.status === TaskStatus.COMPLETED);
    const activeTasks = projectTasks.items.filter(t => t.status === TaskStatus.IN_PROGRESS);

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

  async exportMemory(type: 'tasks' | 'projects' | 'patterns', format: 'json' | 'csv' = 'json'): Promise<string> {
    const pattern = `${this.namespace}:${type}:*`;
    const keys = await this.redis.keys(pattern);
    const items: any[] = [];

    for (const key of keys) {
      const data = await this.redis.get(key);
      if (data) {
        items.push(JSON.parse(data));
      }
    }

    if (format === 'json') {
      return JSON.stringify(items, null, 2);
    } else {
      // Simple CSV export - would be more sophisticated in production
      if (items.length === 0) return '';
      
      const headers = Object.keys(items[0]).filter(k => typeof items[0][k] !== 'object');
      const csv = [
        headers.join(','),
        ...items.map(item => 
          headers.map(h => JSON.stringify(item[h] || '')).join(',')
        )
      ].join('\n');
      
      return csv;
    }
  }

  async importMemory(type: 'tasks' | 'projects' | 'patterns', data: string, format: 'json' | 'csv' = 'json'): Promise<number> {
    let items: any[] = [];

    if (format === 'json') {
      items = JSON.parse(data);
    } else {
      // Simple CSV import - would be more sophisticated in production
      const lines = data.split('\n');
      if (lines.length < 2) return 0;
      
      const headers = lines[0].split(',');
      items = lines.slice(1).map(line => {
        const values = line.split(',');
        const item: any = {};
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

  async cleanupOldMemories(daysToKeep: number = 90): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    const taskPattern = `${this.namespace}:tasks:*`;
    const keys = await this.redis.keys(taskPattern);
    let deleted = 0;

    for (const key of keys) {
      const data = await this.redis.get(key);
      if (data) {
        const task = JSON.parse(data) as TaskMemory;
        if (task.status === TaskStatus.ARCHIVED && 
            new Date(task.metadata.updatedAt) < cutoffDate) {
          await this.redis.del(key);
          deleted++;
        }
      }
    }

    return deleted;
  }
}

// Export helper function to create a Redis client (potentially with redis-local MCP or direct connection)
export async function createRedisClient(): Promise<RedisClient> {
  const url = process.env.REDIS_URL ?? 'redis://localhost:6379';
  console.log(`[LTM] Attempting to create Redis client for URL: ${url}`);

  if (typeof Redis.createClient !== 'function') {
    console.error('[LTM] CRITICAL: Redis.createClient is not a function!');
    throw new Error('Redis.createClient is not a function.');
  }

  try {
    const client = Redis.createClient({ url });
    console.log('[LTM] Redis client created via Redis.createClient.');

    // It's crucial that the client connects.
    // The `redis` library v4 client methods queue commands until connection,
    // but it's good practice to ensure connection explicitly.
    if (typeof client.connect !== 'function') {
        console.error('[LTM] CRITICAL: Created client does not have a connect method.');
        throw new Error('Created Redis client is invalid (missing connect method).');
    }
    
    await client.connect();
    console.log('[LTM] Redis client connected successfully.');

    // Perform a quick check for a key method (e.g., sAdd)
    if (typeof (client as any).sAdd !== 'function') {
        console.warn('[LTM] WARNING: client.sAdd is not a function after connect. This might indicate an issue.');
        // Depending on strictness, you might throw an error here.
        // For now, we'll proceed, but this is a red flag.
    }

    return client as unknown as RedisClient; // Cast to RedisClient, assuming it matches
  } catch (error) {
    console.error('[LTM] Error during Redis client creation or connection:', error);
    throw error; // Re-throw to ensure the calling code knows about the failure.
  }
}

// Usage Example
export async function exampleUsage() {
  // Initialize the memory manager
  const redis = await createRedisClient();
  const memoryManager = new LongTermMemoryManager(redis);

  // Create a new task memory
  const task = await memoryManager.createTaskMemory({
    title: 'Implement authentication system',
    description: 'Add JWT-based authentication to the API',
    category: MemoryCategory.PROJECT,
    projectId: 'project_123',
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.HIGH,
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
    category: [MemoryCategory.PROJECT],
    status: [TaskStatus.IN_PROGRESS]
  });

  console.log('Found tasks:', searchResults.totalCount);

  // Create a knowledge pattern
  const pattern = await memoryManager.createKnowledgePattern({
    name: 'JWT Authentication Pattern',
    description: 'Standard pattern for implementing JWT authentication',
    category: PatternCategory.DESIGN_PATTERN,
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