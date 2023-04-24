import { Price } from "@prisma/client";

export interface SearchParams {
  location?: string;
  cuisine?: string;
  price?: Price;
}
