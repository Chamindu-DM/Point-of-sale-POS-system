// Find the route handler where you create a new sale and modify the invoice number logic
router.post('/', async (req, res) => {
  try {
    // Get the highest existing invoice number
    const lastSale = await Sale.findOne().sort({ invoiceNumber: -1 });
    
    // Set the new invoice number (start with 1 if no sales exist)
    const nextInvoiceNumber = lastSale ? lastSale.invoiceNumber + 1 : 1;
    
    // Create the new sale with the proper invoice number
    const newSale = new Sale({
      ...req.body,
      invoiceNumber: nextInvoiceNumber
    });
    
    // Save the sale
    const savedSale = await newSale.save();
    res.status(201).json(savedSale);
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(400).json({ message: error.message });
  }
});