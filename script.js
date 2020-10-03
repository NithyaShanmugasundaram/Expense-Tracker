const text = document.getElementById("text");
const amount = document.getElementById("amount");
const btn = document.getElementById("btn");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const delete_btn =document.querySelector(".delete_btn")

// const dummyTransactions = [
//   { id: 1, text: "camera", amount: 100 },
//   { id: 1, text: "camera bag", amount: -100 },
//   { id: 1, text: "camera lens", amount: 400 },
//   { id: 1, text: "camera starp", amount: -1000 },
// ];
let localstoragetransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions  = (JSON.parse(localStorage.getItem('transactions')) === null) ? [] : localstoragetransactions;
  // let transactions=dummyTransactions;
//add transactions to the dom
const addTransactionDom = (transaction) => {

  const sign = transaction.amount > 0 ? "+" : "-";
  const item = document.createElement("li");
  item.classList.add(transaction.amount > 0 ? "plus" : "minus");
  item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>`;
  list.appendChild(item);
};
// update balance and income and expense

const updateBalance = () => {
  //update balance
  const amount = transactions.map((transaction) => transaction.amount);
  const total = amount.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  const balanceAmount = Math.abs(total).toFixed(2);
  balance.innerText = `$ ${balanceAmount}`;
  //update income and expense
const plus = amount
    .filter((item) => item > 0)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0)
    .toFixed(2);
const minus = amount
    .filter((item) => item < 0)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);
const expenses = Math.abs(minus).toFixed(2);

income.innerText = `$ ${plus}`;
expense.innerText = `$ ${expenses}`;
};
//add transaction

const addTransaction = (e) => {
    
    e.preventDefault();
   
    if (text.value.trim() === '' || amount.value.trim() === '') {
       prompt("please enter the text and amount.")
   } else{
       const transaction = {
           id:generateId(),
           text:text.value,
           amount:+amount.value,
       }
       
       transactions.push(transaction);
      
       addTransactionDom(transaction);
       updateBalance();
       text.value="";
       amount.value ="";
    }

}
const generateId =() =>{
    return Math.floor(Math.random()*10000);
}
const localStorageFunction =()=>{
    localStorage.setItem('transactions',JSON.stringify(transactions));
   
}
const removeTransaction =(id) =>{
    console.log(id);
   transactions = transactions.filter(transaction=> 
       transaction.id !== id
    )
    console.log(transactions)
   localStorageFunction()
   init()
}

const init = () => {
  //add tranaction to the dom
  list.innerHTML = "";
 
  transactions.forEach(addTransactionDom);
  updateBalance();

};
init();

btn.addEventListener('submit',addTransaction);
