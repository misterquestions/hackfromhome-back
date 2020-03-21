import { Request, Response } from 'express';

export async function index(request: Request, response: Response) {
  response.json("OK");
}