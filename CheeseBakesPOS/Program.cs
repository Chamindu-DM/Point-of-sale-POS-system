using System;
using CheeseBakesPOS.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System.IO;

namespace CheeseBakesPOS
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            // Get the path to the application's data directory
            string dataDirectory = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                "CheeseBakes");
            
            // Create the directory if it doesn't exist
            if (!Directory.Exists(dataDirectory))
                Directory.CreateDirectory(dataDirectory);
            
            // Set the database file path
            string dbPath = Path.Combine(dataDirectory, "CheeseBakesPOS.db");

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlite($"Data Source={dbPath}");

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}