import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
    default: 'Untitled Project',
  },

  description: {
    type: String,
    default: '',
  },

  messages: {
    type: Array,
    default: [],
  },

  generatedCode: {
    type: String,
    default: '',
  },

  versions: {
    type: Array,
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('Project', projectSchema);

export const getUserProjects = async (userId) => {
  return Project.find({ userId }).sort({ updatedAt: -1 });
};

export const createProject = async (userId, title = 'Untitled Project') => {
  return Project.create({ userId, title });
};

export const getProjectById = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId });

  if (!project) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }

  return project;
};

export const updateProject = async (projectId, userId, updateData) => {
  const project = await getProjectById(projectId, userId);

  Object.assign(project, updateData, {
    updatedAt: new Date(),
  });

  await project.save();
  return project;
};

export const deleteProject = async (projectId, userId) => {
  const project = await getProjectById(projectId, userId);
  await project.deleteOne();

  return {
    deleted: true,
    id: projectId,
  };
};

export default Project;