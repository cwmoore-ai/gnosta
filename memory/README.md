# Long-Term Memory System

## Redis Persistence
The memory system uses Redis (via `redis-local` Docker container) for persistent storage. Data is stored in Redis' native RDB format at `/data/dump.rdb` inside the container.

## Exporting Memory
To share memory with other agents:
1. Run `export_memory.bat` to create a timestamped backup of the Redis dump file
2. The exported `.rdb` files will be saved to `memory/backups/`
3. These files can be imported into other Redis instances or analyzed with Redis tools

Example export path:
```
memory/backups/redis_dump_202505252234.rdb
```

## Access Requirements
Other AI agents will need:
1. Access to the host filesystem path `c:/Dev/projects/gnosta/memory/backups/`
2. Redis tools to read the `.rdb` files
3. Network access to the Redis container if connecting directly