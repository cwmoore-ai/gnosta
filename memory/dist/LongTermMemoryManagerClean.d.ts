/**
 * Long-Term Memory Manager for Gnosta.ai
 *
 * A comprehensive memory system using Context7 + Upstash Redis for persistent,
 * queryable memory that survives across sessions and contexts.
 *
 * @author Gnosta.ai Development Team
 * @version 1.0.0
 */
import { PatternCategory, TaskMemory, ProjectInsight, ProjectContext, KnowledgePattern, SessionInteraction, SessionSummary, SessionMemory, SearchCriteria, SearchResult, MemoryStats, RedisClient } from './LongTermMemoryTypes';
/**
 * Main Long-Term Memory Manager Class
 */
export declare class LongTermMemoryManager {
    private redis;
    private namespace;
    private cacheEnabled;
    private cache;
    constructor(redisClient: RedisClient, namespace?: string, cacheEnabled?: boolean);
    private generateId;
    private getKey;
    private setCache;
    private getCache;
    private clearCache;
    createTaskMemory(task: Omit<TaskMemory, 'id' | 'metadata' | 'evolution'>): Promise<TaskMemory>;
    updateTaskMemory(id: string, updates: Partial<TaskMemory>): Promise<TaskMemory | null>;
    getTaskMemory(id: string): Promise<TaskMemory | null>;
    deleteTaskMemory(id: string): Promise<boolean>;
    private updateTaskIndexes;
    private removeTaskFromIndexes;
    createProjectContext(project: Omit<ProjectContext, 'id' | 'metadata' | 'insights'>): Promise<ProjectContext>;
    updateProjectContext(id: string, updates: Partial<ProjectContext>): Promise<ProjectContext | null>;
    getProjectContext(id: string): Promise<ProjectContext | null>;
    addProjectInsight(projectId: string, insight: Omit<ProjectInsight, 'timestamp'>): Promise<void>;
    createKnowledgePattern(pattern: Omit<KnowledgePattern, 'id' | 'metadata' | 'evolution'>): Promise<KnowledgePattern>;
    reinforcePattern(id: string, evidence: string, successRate: number): Promise<KnowledgePattern | null>;
    getKnowledgePattern(id: string): Promise<KnowledgePattern | null>;
    private updatePatternIndexes;
    createSession(context: SessionMemory['context']): Promise<SessionMemory>;
    updateSession(sessionId: string, updates: Partial<SessionMemory>): Promise<SessionMemory | null>;
    getSession(sessionId: string): Promise<SessionMemory | null>;
    addSessionInteraction(sessionId: string, interaction: Omit<SessionInteraction, 'timestamp'>): Promise<void>;
    endSession(sessionId: string, summary: SessionSummary): Promise<void>;
    searchTasks(criteria: SearchCriteria): Promise<SearchResult<TaskMemory>>;
    findSimilarTasks(taskId: string, threshold?: number, maxResults?: number): Promise<TaskMemory[]>;
    searchPatterns(category?: PatternCategory, minConfidence?: number): Promise<KnowledgePattern[]>;
    getMemoryStats(): Promise<MemoryStats>;
    generateProjectReport(projectId: string): Promise<string>;
    exportMemory(type: 'tasks' | 'projects' | 'patterns', format?: 'json' | 'csv'): Promise<string>;
    importMemory(type: 'tasks' | 'projects' | 'patterns', data: string, format?: 'json' | 'csv'): Promise<number>;
    cleanupOldMemories(daysToKeep?: number): Promise<number>;
}
export declare function createRedisClient(mcpServerName?: string): Promise<RedisClient>;
export declare function exampleUsage(): Promise<void>;
//# sourceMappingURL=LongTermMemoryManagerClean.d.ts.map