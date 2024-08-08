// migrations/20240803-162934-init-schema.js

module.exports = {
  async up(db, client) {
    await db.createCollection('tasks', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['title', 'creator'],
          properties: {
            title: {
              bsonType: 'string',
              description: 'Title is required and must be a string'
            },
            description: {
              bsonType: 'string'
            },
            creator: {
              bsonType: 'objectId',
              description: 'Creator is required and must be an ObjectId'
            },
            assignee: {
              bsonType: 'objectId'
            },
            status: {
              enum: ['To Do', 'In Progress', 'Done'],
              description: 'Status can only be one of the enum values'
            },
            priority: {
              enum: ['Low', 'Medium', 'High'],
              description: 'Priority can only be one of the enum values'
            },
            labels: {
              bsonType: 'array',
              items: {
                bsonType: 'string'
              }
            },
            dueDate: {
              bsonType: 'date'
            },
            projectId: {
              bsonType: 'objectId'
            },
            createdAt: {
              bsonType: 'date',
              description: 'CreatedAt is required and must be a date'
            },
            updatedAt: {
              bsonType: 'date',
              description: 'UpdatedAt is required and must be a date'
            },
            comments: {
              bsonType: 'array',
              items: {
                bsonType: 'objectId'
              }
            },
            attachments: {
              bsonType: 'array',
              items: {
                bsonType: 'objectId'
              }
            },
            history: {
              bsonType: 'array',
              items: {
                bsonType: 'objectId'
              }
            }
          }
        }
      }
    });

    await db.createCollection('comments', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['taskId', 'content', 'creator'],
          properties: {
            taskId: {
              bsonType: 'objectId',
              description: 'TaskId is required and must be an ObjectId'
            },
            content: {
              bsonType: 'string',
              description: 'Content is required and must be a string'
            },
            creator: {
              bsonType: 'objectId',
              description: 'Creator is required and must be an ObjectId'
            },
            createdAt: {
              bsonType: 'date',
              description: 'CreatedAt is required and must be a date'
            },
            replies: {
              bsonType: 'array',
              items: {
                bsonType: 'objectId'
              }
            }
          }
        }
      }
    });

    await db.createCollection('replies', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['commentId', 'content', 'creator'],
          properties: {
            commentId: {
              bsonType: 'objectId',
              description: 'CommentId is required and must be an ObjectId'
            },
            content: {
              bsonType: 'string',
              description: 'Content is required and must be a string'
            },
            creator: {
              bsonType: 'objectId',
              description: 'Creator is required and must be an ObjectId'
            },
            createdAt: {
              bsonType: 'date',
              description: 'CreatedAt is required and must be a date'
            }
          }
        }
      }
    });

    await db.createCollection('subtasks', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['parentTaskId', 'title'],
          properties: {
            parentTaskId: {
              bsonType: 'objectId',
              description: 'ParentTaskId is required and must be an ObjectId'
            },
            title: {
              bsonType: 'string',
              description: 'Title is required and must be a string'
            },
            status: {
              enum: ['To Do', 'In Progress', 'Done'],
              description: 'Status can only be one of the enum values'
            },
            createdAt: {
              bsonType: 'date',
              description: 'CreatedAt is required and must be a date'
            },
            updatedAt: {
              bsonType: 'date',
              description: 'UpdatedAt is required and must be a date'
            }
          }
        }
      }
    });

    await db.createCollection('taskHistories', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['taskId', 'action', 'actor'],
          properties: {
            taskId: {
              bsonType: 'objectId',
              description: 'TaskId is required and must be an ObjectId'
            },
            action: {
              bsonType: 'string',
              description: 'Action is required and must be a string'
            },
            actor: {
              bsonType: 'objectId',
              description: 'Actor is required and must be an ObjectId'
            },
            timestamp: {
              bsonType: 'date',
              description: 'Timestamp is required and must be a date'
            },
            changes: {
              bsonType: 'object'
            }
          }
        }
      }
    });
  },

  async down(db, client) {
    await db.collection('tasks').drop();
    await db.collection('comments').drop();
    await db.collection('replies').drop();
    await db.collection('subtasks').drop();
    await db.collection('taskHistories').drop();
  }
};
