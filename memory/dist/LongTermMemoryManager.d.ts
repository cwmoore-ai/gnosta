/**
 * Long-Term Memory Manager for Gnosta.ai
 *
 * A comprehensive memory system using Context7 + Upstash Redis for persistent,
 * queryable memory that survives across sessions and contexts.
 *
 * @author Gnosta.ai Development Team
 * @version 1.0.0
 */
export declare enum MemoryCategory {
    PERSONAL = "personal",
    PROJECT = "project",
    LEARNING = "learning",
    SYSTEM = "system",
    PATTERN = "pattern",
    REFERENCE = "reference"
}
export declare enum TaskStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    ARCHIVED = "archived",
    FAILED = "failed",
    BLOCKED = "blocked"
}
export declare enum Priority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export declare enum ProjectCategory {
    WEB_DEVELOPMENT = "web_development",
    API_DEVELOPMENT = "api_development",
    DATA_SCIENCE = "data_science",
    AUTOMATION = "automation",
    INFRASTRUCTURE = "infrastructure",
    DOCUMENTATION = "documentation",
    OTHER = "other"
}
export declare enum ProjectStatus {
    PLANNING = "planning",
    ACTIVE = "active",
    MAINTENANCE = "maintenance",
    COMPLETED = "completed",
    ARCHIVED = "archived",
    ON_HOLD = "on_hold"
}
export declare enum PatternCategory {
    DESIGN_PATTERN = "design_pattern",
    CODE_PATTERN = "code_pattern",
    WORKFLOW_PATTERN = "workflow_pattern",
    ERROR_PATTERN = "error_pattern",
    OPTIMIZATION_PATTERN = "optimization_pattern",
    INTEGRATION_PATTERN = "integration_pattern"
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
interface RedisClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, options?: {
        ex?: number;
    }): Promise<void>;
    del(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    keys(pattern: string): Promise<string[]>;
    mget(keys: string[]): Promise<(string | null)[]>;
    mset(keyValues: Record<string, string>): Promise<void>;
    incr(key: string): Promise<number>;
    expire(key: string, seconds: number): Promise<void>;
    zadd(key: string, score: number, member: string): Promise<void>;
    zadd(key: string, items: Record<string, number>): Promise<void>;
    zrange(key: string, start: number, stop: number, options?: {
        withScores?: boolean;
    }): Promise<string[]>;
    zrangebyscore(key: string, min: number | string, max: number | string, options?: {
        withScores?: boolean;
        limit?: {
            offset: number;
            count: number;
        };
    }): Promise<string[]>;
    hset(key: string, field: string, value: string): Promise<void>;
    hset(key: string, value: Record<string, string>): Promise<void>;
    hget(key: string, field: string): Promise<string | null>;
    hgetall(key: string): Promise<Record<string, string>>;
    sadd(key: string, members: string[]): Promise<void>;
    smembers(key: string): Promise<string[]>;
    sinter(keys: string[]): Promise<string[]>;
}
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
export {};
//# sourceMappingURL=LongTermMemoryManager.d.ts.map