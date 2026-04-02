export interface RecipeApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    recipes: Recipe[];
    pagination: Pagination;
  };
}

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  author: Author;
  ingredients: string[];
  instructions: Instruction[];
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advance";
  images: string[];
  lovedCount: number;
  savedCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  userId: string;
}

export interface Instruction {
  _id: string;
  step: number;
  instruction: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
