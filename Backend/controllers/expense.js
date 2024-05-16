const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense=async (req, res) =>{
    const {title, amount, category, description, date}  = req.body

    const income=ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try{
         //validations
         if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})

    }catch(error){
        res.status(500).json({message: 'Server Error'})

    }
    console.log(income)
}

exports.getExpense = async (req, res) => {
    try {
        const incomes = await ExpenseSchema.find().sort({ date: -1 }); // Sort by date
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
//new
exports.getExpensesById = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await ExpenseSchema.findById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        console.error('Error fetching income by ID:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    try {
        // Check if the expense exists
        let expense = await ExpenseSchema.findById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Update the expense fields
        if (title) expense.title = title;
        if (amount) expense.amount = amount;
        if (category) expense.category = category;
        if (description) expense.description = description;
        if (date) expense.date = date;

        // Save the updated expense
        await expense.save();
        res.status(200).json({ message: 'Expense Updated', expense });
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    console.log(req.params); // Corrected from params to req.params
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) => {
            if (!income) {
                return res.status(404).json({ message: 'Expense not found' });
            }
            res.status(200).json({ message: 'Expense Deleted' });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Server Error' });
        });
};
