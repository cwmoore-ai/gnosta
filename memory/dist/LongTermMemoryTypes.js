"use strict";
/**
 * Type definitions for Long-Term Memory System
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternCategory = exports.ProjectStatus = exports.ProjectCategory = exports.Priority = exports.TaskStatus = exports.MemoryCategory = void 0;
var MemoryCategory;
(function (MemoryCategory) {
    MemoryCategory["PERSONAL"] = "personal";
    MemoryCategory["PROJECT"] = "project";
    MemoryCategory["LEARNING"] = "learning";
    MemoryCategory["SYSTEM"] = "system";
    MemoryCategory["PATTERN"] = "pattern";
    MemoryCategory["REFERENCE"] = "reference";
})(MemoryCategory || (exports.MemoryCategory = MemoryCategory = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["PENDING"] = "pending";
    TaskStatus["IN_PROGRESS"] = "in_progress";
    TaskStatus["COMPLETED"] = "completed";
    TaskStatus["ARCHIVED"] = "archived";
    TaskStatus["FAILED"] = "failed";
    TaskStatus["BLOCKED"] = "blocked";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
var Priority;
(function (Priority) {
    Priority["LOW"] = "low";
    Priority["MEDIUM"] = "medium";
    Priority["HIGH"] = "high";
    Priority["CRITICAL"] = "critical";
})(Priority || (exports.Priority = Priority = {}));
var ProjectCategory;
(function (ProjectCategory) {
    ProjectCategory["WEB_DEVELOPMENT"] = "web_development";
    ProjectCategory["API_DEVELOPMENT"] = "api_development";
    ProjectCategory["DATA_SCIENCE"] = "data_science";
    ProjectCategory["AUTOMATION"] = "automation";
    ProjectCategory["INFRASTRUCTURE"] = "infrastructure";
    ProjectCategory["DOCUMENTATION"] = "documentation";
    ProjectCategory["OTHER"] = "other";
})(ProjectCategory || (exports.ProjectCategory = ProjectCategory = {}));
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["PLANNING"] = "planning";
    ProjectStatus["ACTIVE"] = "active";
    ProjectStatus["MAINTENANCE"] = "maintenance";
    ProjectStatus["COMPLETED"] = "completed";
    ProjectStatus["ARCHIVED"] = "archived";
    ProjectStatus["ON_HOLD"] = "on_hold";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
var PatternCategory;
(function (PatternCategory) {
    PatternCategory["DESIGN_PATTERN"] = "design_pattern";
    PatternCategory["CODE_PATTERN"] = "code_pattern";
    PatternCategory["WORKFLOW_PATTERN"] = "workflow_pattern";
    PatternCategory["ERROR_PATTERN"] = "error_pattern";
    PatternCategory["OPTIMIZATION_PATTERN"] = "optimization_pattern";
    PatternCategory["INTEGRATION_PATTERN"] = "integration_pattern";
})(PatternCategory || (exports.PatternCategory = PatternCategory = {}));
//# sourceMappingURL=LongTermMemoryTypes.js.map