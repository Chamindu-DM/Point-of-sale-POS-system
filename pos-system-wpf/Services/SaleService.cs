using CheeseBakesPOS.Data;
using CheeseBakesPOS.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CheeseBakesPOS.Services
{
    public class SaleService
    {
        private readonly ApplicationDbContext _context;

        public SaleService()
        {
            _context = new ApplicationDbContext();
        }

        public async Task<List<Sale>> GetAllSalesAsync()
        {
            return await _context.Sales
                .Include(s => s.Items)
                .OrderByDescending(s => s.SaleDate)
                .ToListAsync();
        }

        public async Task<Sale> GetSaleByIdAsync(int id)
        {
            return await _context.Sales
                .Include(s => s.Items)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<bool> AddSaleAsync(Sale sale)
        {
            try
            {
                // Start a transaction
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        // Add the sale
                        _context.Sales.Add(sale);
                        await _context.SaveChangesAsync();

                        // Update product inventory
                        foreach (var item in sale.Items)
                        {
                            var product = await _context.Products.FindAsync(item.ProductId);
                            if (product != null)
                            {
                                product.InStock -= item.Quantity;
                                _context.Entry(product).State = EntityState.Modified;
                            }
                        }
                        
                        await _context.SaveChangesAsync();
                        
                        // Commit the transaction
                        await transaction.CommitAsync();
                        return true;
                    }
                    catch
                    {
                        // Rollback on error
                        await transaction.RollbackAsync();
                        throw;
                    }
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}