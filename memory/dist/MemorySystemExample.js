"use strict";
/**
 * Example usage of the Long-Term Memory System
 * This demonstrates how to use the memory manager with Context7 MCP
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.demonstrateMemorySystem = demonstrateMemorySystem;
const LongTermMemoryManager_1 = require("./LongTermMemoryManager");
const LongTermMemoryTypes_1 = require("./LongTermMemoryTypes");
async function demonstrateMemorySystem() {
    console.log('=== Long-Term Memory System Demo ===\n');
    // Step 1: Initialize the memory manager
    console.log('1. Initializing memory manager...');
    const redis = await (0, LongTermMemoryManager_1.createRedisClient)('redis'); // Would connect to Context7 MCP
    const memoryManager = new LongTermMemoryManager_1.LongTermMemoryManager(redis, 'gnosta-memory');
    console.log('✓ Memory manager initialized\n');
    // Step 2: Create a task memory
    console.log('2. Creating a new task memory...');
    const newTask = await memoryManager.createTaskMemory({
        title: 'Implement Context7 Redis Integration',
        description: 'Create a comprehensive memory system using Context7 MCP server for Redis access',
        category: LongTermMemoryTypes_1.MemoryCategory.PROJECT,
        projectId: 'gnosta_ai_platform',
        status: LongTermMemoryTypes_1.TaskStatus.IN_PROGRESS,
        priority: LongTermMemoryTypes_1.Priority.HIGH,
        tags: ['memory-system', 'redis', 'context7', 'mcp'],
        content: {
            originalRequest: 'Build a long-term memory system with persistence',
            solution: 'Use Context7 MCP server to access Upstash Redis for cloud-based storage',
            codeSnippets: [
                {
                    language: 'typescript',
                    code: `const redis = await createRedisClient('context7');
const memoryManager = new LongTermMemoryManager(redis);`,
                    description: 'Initialize memory manager with Context7'
                }
            ],
            resources: [
                {
                    type: 'documentation',
                    name: 'Context7 MCP Documentation',
                    location: 'https://context7.dev/docs',
                    description: 'Official Context7 documentation'
                },
                {
                    type: 'library',
                    name: 'Upstash Redis',
                    location: 'https://upstash.com',
                    description: 'Serverless Redis platform'
                }
            ],
            learnings: [
                'Context7 provides seamless MCP integration',
                'Upstash Redis offers persistent cloud storage',
                'TypeScript interfaces ensure type safety',
                'Modular architecture enables extensibility'
            ]
        },
        relationships: {
            relatedTasks: [],
            dependencies: [],
            blockedBy: [],
            childTasks: []
        }
    });
    console.log(`✓ Created task: ${newTask.id}\n`);
    // Step 3: Create a project context
    console.log('3. Creating project context...');
    const project = await memoryManager.createProjectContext({
        name: 'Gnosta AI Platform',
        description: 'Intelligent automation platform for service businesses',
        category: LongTermMemoryTypes_1.ProjectCategory.WEB_DEVELOPMENT,
        status: LongTermMemoryTypes_1.ProjectStatus.ACTIVE,
        configuration: {
            technologies: ['TypeScript', 'Node.js', 'Redis', 'MCP'],
            frameworks: ['Express', 'React'],
            patterns: ['Repository Pattern', 'Factory Pattern'],
            conventions: ['ESLint', 'Prettier', 'Conventional Commits']
        },
        structure: {
            directories: ['src/', 'memory/', 'mcp_servers/', 'docs/'],
            keyFiles: ['index.html', 'LongTermMemoryManager.ts'],
            entryPoints: ['src/index.ts']
        },
        relationships: {
            relatedProjects: [],
            dependencies: ['context7-mcp', 'upstash-redis'],
            sharedComponents: []
        }
    });
    console.log(`✓ Created project: ${project.id}\n`);
    // Step 4: Create a knowledge pattern
    console.log('4. Creating a knowledge pattern...');
    const pattern = await memoryManager.createKnowledgePattern({
        name: 'MCP Server Integration Pattern',
        description: 'Standard pattern for integrating MCP servers into applications',
        category: LongTermMemoryTypes_1.PatternCategory.INTEGRATION_PATTERN,
        confidence: 0.9,
        pattern: {
            trigger: {
                conditions: ['Need for external service integration', 'MCP protocol support required'],
                keywords: ['mcp', 'integration', 'server', 'protocol'],
                context: ['Service integration', 'External APIs', 'Protocol implementation']
            },
            context: {
                applicableScenarios: ['AI tool integration', 'Service orchestration', 'API gateways'],
                prerequisites: ['MCP server available', 'Network connectivity', 'Authentication setup'],
                limitations: ['Protocol version compatibility', 'Network latency', 'Rate limiting']
            },
            solution: {
                approach: 'Use MCP client library to connect and communicate with servers',
                implementation: 'Create abstraction layer for MCP communication',
                steps: [
                    'Install MCP client library',
                    'Configure server connection',
                    'Implement tool/resource handlers',
                    'Add error handling and retries',
                    'Test integration thoroughly'
                ]
            },
            variations: [
                {
                    name: 'Direct Integration',
                    description: 'Connect directly to MCP server without abstraction',
                    whenToUse: 'Simple use cases with single server',
                    modifications: ['Skip abstraction layer', 'Direct method calls']
                },
                {
                    name: 'Multi-Server Router',
                    description: 'Route requests to multiple MCP servers',
                    whenToUse: 'Complex systems with many servers',
                    modifications: ['Add routing logic', 'Server discovery mechanism']
                }
            ]
        },
        evidence: {
            examples: [newTask.id],
            successRate: 0.9,
            usageFrequency: 1,
            relatedPatterns: []
        }
    });
    console.log(`✓ Created pattern: ${pattern.id}\n`);
    // Step 5: Search for tasks
    console.log('5. Searching for tasks...');
    const searchResults = await memoryManager.searchTasks({
        query: 'redis',
        category: [LongTermMemoryTypes_1.MemoryCategory.PROJECT],
        tags: ['memory-system'],
        limit: 10
    });
    console.log(`✓ Found ${searchResults.totalCount} tasks`);
    console.log(`  Execution time: ${searchResults.executionTime}ms\n`);
    // Step 6: Find similar tasks
    console.log('6. Finding similar tasks...');
    const similarTasks = await memoryManager.findSimilarTasks(newTask.id, 0.5, 5);
    console.log(`✓ Found ${similarTasks.length} similar tasks\n`);
    // Step 7: Add project insight
    console.log('7. Adding project insight...');
    await memoryManager.addProjectInsight(project.id, {
        type: 'recommendation',
        title: 'Consider Redis Clustering',
        description: 'As the memory system grows, implement Redis clustering for scalability',
        severity: 'medium'
    });
    console.log('✓ Added project insight\n');
    // Step 8: Generate project report
    console.log('8. Generating project report...');
    const report = await memoryManager.generateProjectReport(project.id);
    console.log('✓ Generated report:');
    console.log(report);
    // Step 9: Get memory statistics
    console.log('\n9. Getting memory statistics...');
    const stats = await memoryManager.getMemoryStats();
    console.log('✓ Memory Statistics:');
    console.log(`  - Total Tasks: ${stats.totalTasks}`);
    console.log(`  - Total Projects: ${stats.totalProjects}`);
    console.log(`  - Total Patterns: ${stats.totalPatterns}`);
    console.log(`  - Recent Activity: ${stats.recentActivity.toISOString()}\n`);
    // Step 10: Export memory
    console.log('10. Exporting memory...');
    const exportedTasks = await memoryManager.exportMemory('tasks', 'json');
    console.log(`✓ Exported ${JSON.parse(exportedTasks).length} tasks\n`);
    console.log('=== Demo Complete ===');
}
// Run the demonstration
if (require.main === module) {
    demonstrateMemorySystem().catch(console.error);
}
//# sourceMappingURL=MemorySystemExample.js.map