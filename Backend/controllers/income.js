const incomeSchema = require("../models/incomeModel")


exports.addIncome=async (req, res) =>{
    const {title, amount, category, description, date}  = req.body

    const income=incomeSchema({
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
        res.status(200).json({message: 'Income Added'})

    }catch(error){
        res.status(500).json({message: 'Server Error'})

    }
    console.log(income)
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await incomeSchema.find().sort({ date: -1 }); // Sort by date
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//new

exports.getIncomeById = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await incomeSchema.findById(id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json(income);
    } catch (error) {
        console.error('Error fetching income by ID:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.updateIncome = async (req, res) => {
    console.log(req.body)
    const { id } = req.params;
    console.log(id)
    const { title, amount, category, description, date } = req.body;

    try {
        
        let income = await incomeSchema.findById(id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        
        if (title) income.title = title;
        if (amount) income.amount = amount;
        if (category) income.category = category;
        if (description) income.description = description;
        if (date) income.date = date;

       
        await income.save();
        res.status(200).json({ message: 'Income Updated', income });
    } catch (error) {
        console.error('Error updating income:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};




exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    console.log(req.params); // Corrected from params to req.params
    incomeSchema.findByIdAndDelete(id)
        .then((income) => {
            if (!income) {
                return res.status(404).json({ message: 'Income not found' });
            }
            res.status(200).json({ message: 'Income Deleted' });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Server Error' });
        });
};
