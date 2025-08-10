import { eq, and, sum, desc, count } from 'drizzle-orm'
import { db } from '../db/index.js'
import { budgetCategories, budgetItems, trips } from '../db/index.js'
// Import types directly from PostgreSQL schema to avoid conflicts
import type { BudgetCategory, BudgetItem } from '../db/schema.postgres.js'

// Define manual types for inserts to handle PostgreSQL-specific fields
type NewBudgetCategoryInsert = {
  tripId: string
  userId: string
  name: string
  color: string
  icon: string
  description?: string
  isDefault?: boolean
}

type NewBudgetItemInsert = {
  tripId: string
  userId: string
  categoryId: string
  description: string
  budgetedAmount: string
  actualAmount?: string
  notes?: string
  tags?: string | null
  dateSpent?: Date
}

type BudgetItemUpdateData = {
  description?: string
  budgetedAmount?: string
  actualAmount?: string
  notes?: string
  tags?: string | null
  dateSpent?: Date
  updatedAt?: Date
}

export interface GetBudgetCategoriesParams {
  tripId: string
  userId: string
}

export interface CreateBudgetCategoryParams {
  tripId: string
  userId: string
  name: string
  color: string
  icon: string
  description?: string
}

export interface UpdateBudgetCategoryParams {
  tripId: string
  userId: string
  categoryId: string
  name: string
  color: string
  icon: string
  description?: string
}

export interface DeleteBudgetCategoryParams {
  tripId: string
  userId: string
  categoryId: string
}

export interface GetBudgetItemsParams {
  tripId: string
  userId: string
  categoryId?: string
}

export interface CreateBudgetItemParams {
  tripId: string
  userId: string
  categoryId: string
  description: string
  budgetedAmount: number
  actualAmount?: number
  notes?: string
  tags?: string[]
  dateSpent?: Date
}

export interface UpdateBudgetItemParams {
  tripId: string
  userId: string
  itemId: string
  description?: string
  budgetedAmount?: number
  actualAmount?: number
  notes?: string
  tags?: string[]
  dateSpent?: Date
}

export interface DeleteBudgetItemParams {
  tripId: string
  userId: string
  itemId: string
}

export interface BudgetSummary {
  totalBudgeted: number
  totalActual: number
  remaining: number
  utilizationPercentage: number
  categoryBreakdown: {
    categoryId: string
    categoryName: string
    budgeted: number
    actual: number
    itemCount: number
  }[]
}

export class BudgetService {
  /**
   * Verify user has access to trip
   */
  private async verifyTripAccess(tripId: string, userId: string): Promise<void> {
    const trip = await db
      .select({ id: trips.id })
      .from(trips)
      .where(and(eq(trips.id, tripId), eq(trips.userId, userId)))
      .limit(1)

    if (!trip.length) {
      throw new Error('Trip not found or access denied')
    }
  }

  /**
   * Initialize default budget categories for a trip
   */
  async initializeDefaultCategories(tripId: string, userId: string): Promise<BudgetCategory[]> {
    await this.verifyTripAccess(tripId, userId)

    const defaultCategories = [
      {
        name: 'Accommodation',
        color: '#3b82f6',
        icon: '🏨',
        description: 'Hotels, hostels, vacation rentals',
      },
      {
        name: 'Transport',
        color: '#8b5cf6',
        icon: '✈️',
        description: 'Flights, trains, buses, taxis',
      },
      {
        name: 'Food & Dining',
        color: '#f97316',
        icon: '🍽️',
        description: 'Restaurants, groceries, drinks',
      },
      {
        name: 'Activities',
        color: '#10b981',
        icon: '🎯',
        description: 'Tours, experiences, entertainment',
      },
      {
        name: 'Shopping',
        color: '#ec4899',
        icon: '🛍️',
        description: 'Souvenirs, clothes, gifts',
      },
      {
        name: 'Miscellaneous',
        color: '#6b7280',
        icon: '📝',
        description: 'Tips, fees, unexpected expenses',
      },
    ]

    const newCategories: NewBudgetCategoryInsert[] = defaultCategories.map(cat => ({
      tripId,
      userId,
      name: cat.name,
      color: cat.color,
      icon: cat.icon,
      description: cat.description,
      isDefault: true,
    }))

    const result = await db.insert(budgetCategories).values(newCategories).returning()
    return result
  }

  /**
   * Get all budget categories for a trip
   */
  async getBudgetCategories(params: GetBudgetCategoriesParams): Promise<BudgetCategory[]> {
    const { tripId, userId } = params
    await this.verifyTripAccess(tripId, userId)

    const categories = await db
      .select()
      .from(budgetCategories)
      .where(and(eq(budgetCategories.tripId, tripId), eq(budgetCategories.userId, userId)))
      .orderBy(budgetCategories.name)

    return categories
  }

  /**
   * Create a new budget category
   */
  async createBudgetCategory(params: CreateBudgetCategoryParams): Promise<BudgetCategory> {
    const { tripId, userId, name, color, icon, description } = params
    await this.verifyTripAccess(tripId, userId)

    const newCategory: NewBudgetCategoryInsert = {
      tripId,
      userId,
      name,
      color,
      icon,
      description,
      isDefault: false,
    }

    const result = await db.insert(budgetCategories).values(newCategory).returning()

    if (!result.length) {
      throw new Error('Failed to create budget category')
    }

    return result[0]
  }

  /**
   * Update a budget category
   */
  async updateBudgetCategory(params: UpdateBudgetCategoryParams): Promise<BudgetCategory | null> {
    const { tripId, userId, categoryId, name, color, icon, description } = params

    const updateData = {
      name,
      color,
      icon,
      description,
      updatedAt: new Date(),
    }

    const result = await db
      .update(budgetCategories)
      .set(updateData)
      .where(
        and(
          eq(budgetCategories.id, categoryId),
          eq(budgetCategories.tripId, tripId),
          eq(budgetCategories.userId, userId)
        )
      )
      .returning()

    return result[0] || null
  }

  /**
   * Delete a budget category and all its items
   */
  async deleteBudgetCategory(params: DeleteBudgetCategoryParams): Promise<boolean> {
    const { tripId, userId, categoryId } = params

    // First delete all budget items in this category
    await db
      .delete(budgetItems)
      .where(
        and(
          eq(budgetItems.categoryId, categoryId),
          eq(budgetItems.tripId, tripId),
          eq(budgetItems.userId, userId)
        )
      )

    // Then delete the category
    const result = await db
      .delete(budgetCategories)
      .where(
        and(
          eq(budgetCategories.id, categoryId),
          eq(budgetCategories.tripId, tripId),
          eq(budgetCategories.userId, userId)
        )
      )
      .returning()

    return result.length > 0
  }

  /**
   * Get all budget items for a trip, optionally filtered by category
   */
  async getBudgetItems(params: GetBudgetItemsParams): Promise<BudgetItem[]> {
    const { tripId, userId, categoryId } = params
    await this.verifyTripAccess(tripId, userId)

    const conditions = [eq(budgetItems.tripId, tripId), eq(budgetItems.userId, userId)]

    if (categoryId) {
      conditions.push(eq(budgetItems.categoryId, categoryId))
    }

    const items = await db
      .select()
      .from(budgetItems)
      .where(and(...conditions))
      .orderBy(desc(budgetItems.createdAt))

    return items
  }

  /**
   * Create a new budget item
   */
  async createBudgetItem(params: CreateBudgetItemParams): Promise<BudgetItem> {
    const {
      tripId,
      userId,
      categoryId,
      description,
      budgetedAmount,
      actualAmount = 0,
      notes,
      tags,
      dateSpent,
    } = params

    await this.verifyTripAccess(tripId, userId)

    // Verify category exists and belongs to user/trip
    const category = await db
      .select({ id: budgetCategories.id })
      .from(budgetCategories)
      .where(
        and(
          eq(budgetCategories.id, categoryId),
          eq(budgetCategories.tripId, tripId),
          eq(budgetCategories.userId, userId)
        )
      )
      .limit(1)

    if (!category.length) {
      throw new Error('Budget category not found')
    }

    const newBudgetItem: NewBudgetItemInsert = {
      tripId,
      userId,
      categoryId,
      description,
      budgetedAmount: budgetedAmount.toString(),
      actualAmount: actualAmount.toString(),
      notes,
      tags: tags ? JSON.stringify(tags) : null,
      dateSpent,
    }

    const result = await db.insert(budgetItems).values(newBudgetItem).returning()

    if (!result.length) {
      throw new Error('Failed to create budget item')
    }

    return result[0]
  }

  /**
   * Update a budget item
   */
  async updateBudgetItem(params: UpdateBudgetItemParams): Promise<BudgetItem | null> {
    const { tripId, userId, itemId, ...updateFields } = params

    const updateData: BudgetItemUpdateData = {
      updatedAt: new Date(),
    }

    // Copy fields that don't need conversion
    if (updateFields.description !== undefined) updateData.description = updateFields.description
    if (updateFields.notes !== undefined) updateData.notes = updateFields.notes
    if (updateFields.dateSpent !== undefined) updateData.dateSpent = updateFields.dateSpent

    // Handle tags serialization
    if (updateFields.tags !== undefined) {
      updateData.tags = updateFields.tags ? JSON.stringify(updateFields.tags) : null
    }

    // Handle numeric fields conversion
    if (updateFields.budgetedAmount !== undefined) {
      updateData.budgetedAmount = updateFields.budgetedAmount.toString()
    }
    if (updateFields.actualAmount !== undefined) {
      updateData.actualAmount = updateFields.actualAmount.toString()
    }

    const result = await db
      .update(budgetItems)
      .set(updateData)
      .where(
        and(
          eq(budgetItems.id, itemId),
          eq(budgetItems.tripId, tripId),
          eq(budgetItems.userId, userId)
        )
      )
      .returning()

    return result[0] || null
  }

  /**
   * Delete a budget item
   */
  async deleteBudgetItem(params: DeleteBudgetItemParams): Promise<boolean> {
    const { tripId, userId, itemId } = params

    const result = await db
      .delete(budgetItems)
      .where(
        and(
          eq(budgetItems.id, itemId),
          eq(budgetItems.tripId, tripId),
          eq(budgetItems.userId, userId)
        )
      )
      .returning()

    return result.length > 0
  }

  /**
   * Get budget summary with totals and category breakdown
   */
  async getBudgetSummary(tripId: string, userId: string): Promise<BudgetSummary> {
    await this.verifyTripAccess(tripId, userId)

    // Get all categories and their totals
    const categoriesWithTotals = await db
      .select({
        categoryId: budgetCategories.id,
        categoryName: budgetCategories.name,
        budgeted: sum(budgetItems.budgetedAmount),
        actual: sum(budgetItems.actualAmount),
        itemCount: budgetItems.id,
      })
      .from(budgetCategories)
      .leftJoin(
        budgetItems,
        and(
          eq(budgetItems.categoryId, budgetCategories.id),
          eq(budgetItems.tripId, tripId),
          eq(budgetItems.userId, userId)
        )
      )
      .where(and(eq(budgetCategories.tripId, tripId), eq(budgetCategories.userId, userId)))
      .groupBy(budgetCategories.id, budgetCategories.name)

    // Calculate totals
    let totalBudgeted = 0
    let totalActual = 0
    const categoryBreakdown: BudgetSummary['categoryBreakdown'] = []

    for (const category of categoriesWithTotals) {
      const budgeted = Number(category.budgeted || 0)
      const actual = Number(category.actual || 0)

      totalBudgeted += budgeted
      totalActual += actual

      // Get item count separately for more accuracy
      const itemCountResult = await db
        .select({ count: count() })
        .from(budgetItems)
        .where(
          and(
            eq(budgetItems.categoryId, category.categoryId),
            eq(budgetItems.tripId, tripId),
            eq(budgetItems.userId, userId)
          )
        )

      categoryBreakdown.push({
        categoryId: category.categoryId,
        categoryName: category.categoryName,
        budgeted,
        actual,
        itemCount: Number(itemCountResult[0]?.count || 0),
      })
    }

    const remaining = totalBudgeted - totalActual
    const utilizationPercentage = totalBudgeted > 0 ? (totalActual / totalBudgeted) * 100 : 0

    return {
      totalBudgeted,
      totalActual,
      remaining,
      utilizationPercentage,
      categoryBreakdown,
    }
  }
}
