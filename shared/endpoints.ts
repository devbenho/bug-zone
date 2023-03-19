export type EndpointConfig = {
  url: string;
  method: "patch" | "get" | "post" | "delete";
  auth?: boolean;
  sensitive?: boolean; // Skips logging request body
};

export enum Endpoints {
  // Is Server Work?
  healthz = "healthz",

  // Auth
  signin = "signin",
  signup = "signup",

  // Me
  updateMe = "updateMe",
  deleteMe = "deleteMe",
  getMe = "getMe",

  // User - Admin Access
  getUser = "getUser",
  updatetUser = "updatetUser",
  deleteUser = "deletetUser",

  // Problems
  listProblems = "listProblems",
  getProblem = "getProblem",
  createProblem = "createProblem",
  deleteProblem = "deleteProblem",

  // Solutions
  countSolutions = "countSolutions",
  listSolutions = "listSolutions",
  createSolution = "createSolution",
  deleteSolution = "deleteSolution",

  // Reacts
  listReacts = "listReacts",
  createReact = "createReact",
  deleteReact = "deleteReact",
}

export function withParams(
  endpoint: EndpointConfig,
  ...params: string[]
): EndpointConfig {
  let url = endpoint.url;
  const placeholders = url.match(/:[^\/]*/g) || [];
  if (placeholders.length !== params.length) {
    throw `Too ${
      placeholders.length < params.length ? "many" : "few"
    } params for url: ${url}!`;
  }
  for (let index = 0; index < params.length; index++) {
    url = url.replace(placeholders[index], params[index]);
  }
  return {
    url: url,
    method: endpoint.method,
    auth: endpoint.auth,
  } as EndpointConfig;
}

export const ENDPOINT_CONFIGS: { [key in Endpoints]: EndpointConfig } = {
  [Endpoints.healthz]: { method: "get", url: "/api/v1/healthz" },
  [Endpoints.signin]: { method: "post", url: "/api/v1/auth/signIn" },
  [Endpoints.signup]: { method: "post", url: "/api/v1/auth/signUp" },
  [Endpoints.updateMe]: {
    url: "/api/v1/users/me",
    method: "patch",
    auth: true,
  },
  [Endpoints.deleteMe]: {
    url: "/api/v1/users/me",
    method: "delete",
    auth: true,
  },
  [Endpoints.getMe]: {
    url: "/api/v1/users/me",
    method: "get",
    auth: true,
  },
  [Endpoints.getUser]: {
    url: "/api/v1/users/:id",
    method: "get",
    auth: true,
  },
  [Endpoints.updatetUser]: {
    url: "/api/v1/users/:id",
    method: "patch",
    auth: true,
  },
  [Endpoints.deleteUser]: {
    url: "/api/v1/users/:id",
    method: "delete",
    auth: true,
  },
  [Endpoints.listProblems]: {
    url: "/api/v1/problems",
    method: "get",
    auth: true,
  },
  [Endpoints.getProblem]: {
    url: "/api/v1/problems/:id",
    method: "get",
    auth: true,
  },
  [Endpoints.createProblem]: {
    url: "/api/v1/problems",
    method: "post",
    auth: true,
  },
  [Endpoints.deleteProblem]: {
    url: "/api/v1/problems/:id",
    method: "delete",
    auth: true,
  },
  [Endpoints.countSolutions]: {
    url: "/api/v1/solutions/count",
    method: "get",
    auth: true,
  },
  [Endpoints.listSolutions]: {
    url: "/api/v1/solutions",
    method: "get",
    auth: true,
  },
  [Endpoints.createSolution]: {
    url: "/api/v1/solutions",
    method: "post",
    auth: true,
  },
  [Endpoints.deleteSolution]: {
    url: "/api/v1/solutions/:id",
    method: "get",
    auth: true,
  },
  [Endpoints.listReacts]: {
    url: "/api/v1/reacts",
    method: "get",
    auth: true,
  },
  [Endpoints.createReact]: {
    url: "/api/v1/reacts",
    method: "post",
    auth: true,
  },
  [Endpoints.deleteReact]: {
    url: "/api/v1/reacts",
    method: "delete",
    auth: true,
  },
};
