import { useState } from 'react'
import InputBox from './component/InputBox.jsx'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {

  const [amount, setAmount] = useState()
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState()

  const currencyInfo = useCurrencyInfo(from)
  const option = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
    
  }

  return (
    <>
      <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
        style={{ backgroundImage: `url(https://images.pexels.com/photos/4497591/pexels-photo-4497591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)` }}>
        <div className='w-full'>
          <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/20'>
            <form onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}>
              <div className='w-full mb-1'>
                < InputBox
                  lable="from"
                  amount={amount}
                  currencyOptions={option}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  onAmountChange={(amount) => setAmount(amount)}
                  selectCurrency={from} />
              </div>
              <div className='relative w-full h-0.5'>
                <button
                  className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
                  onClick={swap}
                >Swap</button>
              </div>
              <div className='w-full mb-1'>
                < InputBox
                  lable="To"
                  amount={convertedAmount}
                  currencyOptions={option}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisabled />
              </div>
              <button
                type='submit'
                className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'>
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
