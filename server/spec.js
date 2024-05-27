Object.defineProperty(exports, "__esModule", { value: true });
exports.openapispec = void 0;
exports.openapispec = {
  "openapi": "3.0.0",
  "info": {
    "title": "Example App API",
    "version": "1.0.0",
    "description": "API documentation for the Example app"
  },
  "servers": [
    {
      "url": "http://localhost:5000",
      "description": "Local server"
    }
  ],
  "paths": {
    "/": {
      "get": {
        "summary": "Get root message",
        "responses": {
          "200": {
            "description": "A simple message",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string",
                  "example": "Hello My King"
                }
              }
            }
          }
        }
      }
    },
    "/api/user/login": {
      "post": {
        "summary": "Login user",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "userid": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  }
                },
                "required": [
                  "userid",
                  "password"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful login",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "authtoken": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid input"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/api/user/getuser": {
      "post": {
        "summary": "Get user details",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "User details",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/api/user/userCoordinates": {
      "get": {
        "summary": "Get user coordinates",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "User coordinates",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "coordinates": {
                      "type": "array",
                      "items": {
                        "type": "number"
                      }
                    },
                    "userId": {
                      "type": "string"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "User not found"
            },
            "500": {
              "description": "Internal server error"
            }
          }
        }
      }
    },
    "/api/place/fetchallplaces": {
      "get": {
        "summary": "Fetch all places",
        "responses": {
          "200": {
            "description": "List of places",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Place"
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error"
            }
          }
        }
      }
    },
    "/api/place/addplace": {
      "post": {
        "summary": "Add a new place",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Place"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Place added successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Place"
                }
              }
            }
          },
          "400": {
            "description": "Invalid input"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/api/place/updateplace/{id}": {
      "put": {
        "summary": "Update an existing place",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Place"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Place updated successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Place"
                }
              }
            }
          },
          "400": {
            "description": "Invalid input"
          },
          "404": {
            "description": "Place not found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/api/place/archiveplace/{id}": {
      "put": {
        "summary": "Archive an existing place",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Place archived successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Place"
                }
              }
            }
          },
          "404": {
            "description": "Place not found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/api/place/deleteplace/{id}": {
      "delete": {
        "summary": "Delete an existing place",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Place deleted successfully"
          },
          "404": {
            "description": "Place not found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/api/admin/fetchalladmin": {
      "get": {
        "summary": "Fetch all admins",
        "responses": {
          "200": {
            "description": "List of admins",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Admin"
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error"
            }
          }
        }
      }
    },
    "/api/admin/fetchallusers": {
      "get": {
        "summary": "Fetch all users",
        "responses": {
          "200": {
            "description": "List of users",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error"
            }
          }
        }
      }
    },
    "/api/admin/createuser": {
      "post": {
        "summary": "Create a new user",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/User"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "User created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "400": {
            "description": "Invalid input"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/api/admin/login": {
      "post": {
        "summary": "Login admin",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  }
                },
                "required": [
                  "username",
                  "password"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful login",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "authtoken": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid input"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/api/admin/getuser": {
      "post": {
        "summary": "Get admin details",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Admin details",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/api/admin/register": {
      "post": {
        "summary": "Register a new admin",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Admin"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Admin registered successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Admin"
                }
              }
            }
          },
          "400": {
            "description": "Invalid input"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "User": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "userid": {
            "type": "string"
          },
          "coordinates": {
            "type": "array",
            "items": {
              "type": "number"
            }
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "userid",
          "password"
        ]
      },
      "Admin": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "username",
          "password"
        ]
      },
      "Place": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "coordinates": {
            "type": "array",
            "items": {
              "type": "number"
            }
          },
          "expiration": {
            "type": "string"
          },
          "author": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "address",
          "coordinates",
          "author"
        ]
      }
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  }
};
