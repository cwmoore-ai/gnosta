# Long-Term Memory System for Gnosta.ai

A comprehensive memory system implementation using redis-local (Docker, port 6379, C:\Dev\redis-data) + Upstash Redis for persistent, queryable memory that survives across sessions and contexts.

## 1. Project Overview

### Purpose and Goals
This memory system provides intelligent storage and retrieval capabilities for:
- **Task Memory** - Store and track tasks with full context and evolution
- **Project Context** - Manage project-level information and insights
- **Knowledge Patterns** - Discover and reinforce reusable patterns
- **Session Memory** - Temporary session-based storage
- **Analytics** - Memory usage insights and statistics

### Key Features
1. **Task Memory Management**
   - Create, update, delete, and retrieve tasks
   - Full evolution tracking with timestamps
   - Relationship mapping between tasks

2. **Project Context Management**
   - Track project configuration and structure
   - Store project insights and analytics
   - Generate comprehensive reports

3. **Knowledge Pattern Recognition**
   - Discover patterns from completed tasks
   - Reinforce patterns with evidence
   - Suggest applicable patterns

4. **Advanced Search Capabilities**
   - Multi-criteria search with filters
   - Text-based query search
   - Similarity search

5. **Session Management**
   - Temporary session storage
   - Interaction tracking
   - Automatic archiving

6. **Analytics and Insights**
   - Memory utilization statistics
   - Access pattern analysis
   - Performance metrics

## 2. Installation

### Prerequisites
- Node.js 18.x or higher
- Redis instance (Upstash recommended)
- redis-local (Docker, port 6379, C:\Dev\redis-data)

### Installation Steps
```bash
# Navigate to memory directory
cd memory

# Install dependencies
npm install

# Ensure redis-local Docker container is running
# (Refer to your Docker setup for redis-local)
```

### Configuration Requirements
1. Set Redis connection in environment variables:
```env
REDIS_URL=your_redis_url
REDIS_TOKEN=your_redis_token
```

2. Configure redis-local MCP in `mcp-servers-config.json` (or `mcp_settings.json` if applicable):
```json
{
  "mcpServers": { // Or "servers" in mcp_settings.json
    "redis-local": {
      "description": "Local Redis server (Docker, port 6379, C:\\Dev\\redis-data)",
      "disabled": false,
      "autoApprove": []
      // Ensure port and other connection details are correctly configured
      // if this server entry is used directly by the application.
      // For Gnosta, this is usually managed by LongTermMemoryManager connecting to Redis directly.
    }
  }
}
```

## 3. Usage

### Basic Usage Example
```typescript
import { LongTermMemoryManager, createRedisClient } from './LongTermMemoryManagerClean';
import { MemoryCategory, TaskStatus, Priority } from './LongTermMemoryTypes';

// Initialize the memory manager
const redis = await createRedisClient('redis-local');
const memoryManager = new LongTermMemoryManager(redis);

// Create a task
const task = await memoryManager.createTaskMemory({
  title: 'Implement authentication',
  description: 'Add JWT authentication to API',
  category: MemoryCategory.PROJECT,
  status: TaskStatus.IN_PROGRESS,
  priority: Priority.HIGH,
  tags: ['auth', 'security'],
  content: {
    originalRequest: 'Add secure authentication',
    solution: 'Implement JWT with refresh tokens',
    learnings: ['Use HTTPS', 'Implement token expiration']
  }
});
```

### Common Operations
```typescript
// Search for tasks
const results = await memoryManager.searchTasks({
  query: 'authentication',
  category: [MemoryCategory.PROJECT],
  status: [TaskStatus.IN_PROGRESS]
});

// Generate project report
const report = await memoryManager.generateProjectReport('project_id');

// Get session memory
const session = await memoryManager.getSessionMemory('session_id');
```

## 4. API Reference

### Key Interfaces and Classes
1. **LongTermMemoryManager**
   - Main orchestrator class for memory operations

2. **Memory Types**
   - `MemoryCategory`: Enum for memory categories
   - `TaskStatus`: Task lifecycle states
   - `Priority`: Priority levels

### Method Descriptions
```typescript
// Create a new task memory
createTaskMemory(config: TaskMemoryConfig): Promise<TaskMemory>

// Search tasks with filters
searchTasks(params: SearchParams): Promise<SearchResult[]>

// Get memory by ID
getMemoryById(id: string): Promise<MemoryItem | null>

// Delete memory item
deleteMemory(id: string): Promise<boolean>
```

### Error Handling
- Throws `RedisConnectionError` for Redis issues
- Throws `InvalidMemoryError` for invalid data
- Throws `PermissionDeniedError` for access violations

## 5. Configuration

### Redis Connection Settings
```env
# Redis configuration in environment variables
REDIS_URL=your_redis_url
REDIS_TOKEN=your_redis_token
REDIS_TIMEOUT=5000
```

### redis-local Integration
1. Server configuration in `mcp-servers-config.json` (or `mcp_settings.json` for older setups)
2. Connection pooling settings
3. Request timeout configuration

### Performance Tuning
```typescript
// Cache configuration
const cacheConfig = {
  ttl: 300, // Time to live in seconds
  max: 1000 // Max items in cache
};

// Batch operation settings
const batchConfig = {
  batchSize: 100,
  delay: 50
};
```

## 6. Troubleshooting

### Common Issues and Solutions
1. **Redis Connection Failed**
   - Verify Redis URL and token
   - Check network connectivity
   - Ensure Redis instance is running

2. **redis-local Not Found/Configured**
   - Ensure redis-local Docker container is running.
   - Verify server configuration in `mcp-servers-config.json` or ensure direct Redis connection parameters are correct.

3. **Memory Leaks**
   - Use proper TTL settings
   - Monitor cache size
   - Implement cleanup routines

### Debugging Tips
1. Enable debug logging:
```env
DEBUG=memory_system:*
```

2. Use Redis CLI for manual inspection:
```bash
redis-cli -u your_redis_url
```

3. Monitor memory usage:
```typescript
const stats = await memoryManager.getMemoryStats();
console.log(`Total items: ${stats.totalItems}`);
```

### Support Resources
- [Redis Documentation](https://redis.io/docs/)
- [Redis Best Practices](https://redis.io/docs/)
- Gnosta.ai Slack channel: #memory-system

## License
This memory system is part of the Gnosta.ai platform and follows the project's licensing terms.