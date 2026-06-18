import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { BookService } from "../services/book.service";
import { WorkflowService } from "../services/workflow.service";
import { LookupService } from "../services/lookup.service";

export class AppController {
  static async me(req: AuthRequest, res: Response) {
    const { password, ...userWithoutPassword } = req.user;
    res.json(userWithoutPassword);
  }

  static async catalog(req: AuthRequest, res: Response) {
    try {
      const { search, genreId, availability, sort, page, size } = req.query;
      const result = await BookService.catalog({
        search: search as string,
        genreId: genreId as string,
        availability: availability as string,
        sort: sort as string,
        page: parseInt(page as string) || 0,
        size: parseInt(size as string) || 20,
      });
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async myBooks(req: AuthRequest, res: Response) {
    try {
      const { page, size } = req.query;
      const result = await BookService.myBooks(
        req.user.id,
        parseInt(page as string) || 0,
        parseInt(size as string) || 20
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getBook(req: AuthRequest, res: Response) {
    try {
      const result = await BookService.get(req.params.id);
      res.json(result);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  static async createBook(req: AuthRequest, res: Response) {
    try {
      const result = await BookService.create(req.user.id, req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateBook(req: AuthRequest, res: Response) {
    try {
      const result = await BookService.update(
        req.user.id,
        req.params.id,
        req.body,
        req.user.role === "ADMIN"
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteBook(req: AuthRequest, res: Response) {
    try {
      await BookService.delete(req.user.id, req.params.id, req.user.role === "ADMIN");
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async myRequests(req: AuthRequest, res: Response) {
    try {
      const { page, size } = req.query;
      const result = await WorkflowService.myRequests(
        req.user.id,
        req.user.role === "ADMIN",
        parseInt(page as string) || 0,
        parseInt(size as string) || 20
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async requestBook(req: AuthRequest, res: Response) {
    try {
      const result = await WorkflowService.requestBook(req.user.id, req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async approveRequest(req: AuthRequest, res: Response) {
    try {
      const result = await WorkflowService.approve(
        req.user.id,
        req.params.id,
        req.user.role === "ADMIN"
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async rejectRequest(req: AuthRequest, res: Response) {
    try {
      const result = await WorkflowService.reject(
        req.user.id,
        req.params.id,
        req.user.role === "ADMIN"
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async borrowed(req: AuthRequest, res: Response) {
    try {
      const { page, size } = req.query;
      const result = await WorkflowService.borrowed(
        req.user.id,
        parseInt(page as string) || 0,
        parseInt(size as string) || 20
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async loanHistory(req: AuthRequest, res: Response) {
    try {
      const { page, size } = req.query;
      const result = await WorkflowService.history(
        req.user.id,
        req.user.role === "ADMIN",
        parseInt(page as string) || 0,
        parseInt(size as string) || 20
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async returnBook(req: AuthRequest, res: Response) {
    try {
      const result = await WorkflowService.returnBook(
        req.user.id,
        req.params.id,
        req.user.role === "ADMIN"
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async genres(req: AuthRequest, res: Response) {
    try {
      const result = await LookupService.genres();
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async dashboard(req: AuthRequest, res: Response) {
    try {
      const result = await LookupService.dashboard(req.user.id);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async bookHistory(req: AuthRequest, res: Response) {
    try {
      const { page, size } = req.query;
      const result = await LookupService.bookHistory(
        req.params.id,
        parseInt(page as string) || 0,
        parseInt(size as string) || 20
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
