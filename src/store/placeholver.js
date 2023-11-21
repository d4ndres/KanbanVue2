import { nanoid } from 'nanoid';

columns = [
  {
    id: nanoid(),
    title: "Backlog",
    color: '#49C4E5',
    tasks: [
      {
        id: nanoid(),
        title: "Create marketing landing page",
        createdAt: new Date(),
      },

      {
        id: nanoid(),
        title: "Add Firebase Analytics",
        createdAt: new Date(),
      },


    ],
  },
  {
    id: nanoid(),
    title: "In Progress",
    color: '#8471F2',
    tasks: [

      {
        id: nanoid(),
        title: "Install SSL certificate",
        createdAt: new Date(),
      },

      {
        id: nanoid(),
        title: "Refactor codebase",
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Document the API",
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Conduct user testing",
        createdAt: new Date(),
      },
    ],
  },
  {
    id: nanoid(),
    title: "Done",
    color: '#67E2AE',
    tasks: [
      {
        id: nanoid(),
        title: "Finalize marketing landing page",
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Prepare weekly newsletter",
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Design database schema",
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Monitor system performance",
        createdAt: new Date(),
      },
    ],
  },
]