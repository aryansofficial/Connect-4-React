import React, { useState } from 'react'
import { toast,ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Icon, Button } from './components/icon'

import Score from './components/Score'


var ItemArray = 
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 
20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 
30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 
40, 41]
const split = 7
var checkList = [] // This will have the rows
var checkListColumn = [] // This will have the columns
var checkListFirstDgonal = [] // This is for first digonal check
var checkListSecondDgonal = [] // This is for second diginal check


const App = () => {

  const [ red, setRed ] = useState(true)
  const [ redScore, setRedScore ] = useState(0)
  const [ yellowScore, setYellowScore ] = useState(0)


  const ReloadButton = ({ItemArray}) => {
    return (
        <button className='reload-button button' onClick={()=>{
            // console.log(ItemArray)
            {
              ItemArray.map( (item,index) => {
                ItemArray[index] = String(item).split(' ')[0]
              })
            }
            console.log(ItemArray)
            setRed(true)
            console.log(red)
            setRedScore(0)
            setYellowScore(0)
            toast.success('Game Reloaded!', {
              position: toast.POSITION.BOTTOM_RIGHT,
              className: 'toast toast-reload'
            })
            checkList = [] // This will have the rows
            checkListColumn = [] // This will have the columns
            checkListFirstDgonal = [] // This is for first digonal check
            checkListSecondDgonal = [] // This is for second diginal check
            console.log(ItemArray)
        }}>
            Reload
        </button>
    )
}

const InfoButton = ({ItemArray}) => {
  return (
      <div className='information-zone'>
          <button className='information button' onClick={() => {
        console.log('hello')
          return toast(`Connect 4 of your disks in any direction a row, a column, or a digonal`, {
              className: 'full-row-toast toast',
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 10000
          })
      }}>
              Rules?
          </button>
          <ReloadButton ItemArray={ItemArray}/>
      </div>
  )
}

  const checkWin = () => {

    for (let i =0 ; i<= 5 ; i++) {
      // full row
      for ( let j=0; j<= 3; j++){
        if (
          (String(ItemArray[split*i+j]).split(' ')[2] === String(ItemArray[split*i+j+1]).split(' ')[2]) &&
          (String(ItemArray[split*i+j+1]).split(' ')[2] === String(ItemArray[split*i+j+2]).split(' ')[2]) &&
          (String(ItemArray[split*i+j+2]).split(' ')[2] === String(ItemArray[split*i+j+3]).split(' ')[2]) &&
          String(ItemArray[split*i+j+3]).split(' ')[2] !== undefined 
        ) {

          if (
            (  !checkList.includes(String(ItemArray[split*i+j]).split(' ')[0]) &&
                !checkList.includes(String(ItemArray[split*i+j+1]).split(' ')[0]) &&
                !checkList.includes(String(ItemArray[split*i+j+2]).split(' ')[0]) &&
                !checkList.includes(String(ItemArray[split*i+j+3]).split(' ')[0])
            ) || checkList.length == 0
          ) {
              red ? setRedScore(redScore + 1) : setYellowScore(yellowScore+1)
              {<>
                { 
                  toast(`${red ? ('Red') : 'Yellow'} Completed Row`,{
                    type: 'success' ,
                    position: toast.POSITION.BOTTOM_RIGHT,
                    className: `toast background-${red ? ('red') : 'yellow'}`
                })
                }
              </>}
              checkList.push(
                String(ItemArray[split*i+j]).split(' ')[0],
                String(ItemArray[split*i+j+1]).split(' ')[0],
                String(ItemArray[split*i+j+2]).split(' ')[0],
                String(ItemArray[split*i+j+3]).split(' ')[0]
                )
            }
          }
          }
      }
      ////////////////
      for (let i =0 ; i<= 2 ; i++) {
        // full column
        for ( let j=0; j<= 6; j++){
            if (
              ((String(ItemArray[split*i+j]).split(' ')[2] === (String(ItemArray[split*(i+1)+j]).split(' ')[2])) &&
              ((String(ItemArray[split*(i+1)+j]).split(' ')[2] === (String(ItemArray[split*(i+2)+j]).split(' ')[2])) &&
              ((String(ItemArray[split*(i+2)+j]).split(' ')[2] === (String(ItemArray[split*(i+3)+j]).split(' ')[2])) &&
              ((String(ItemArray[split*i+j]).split(' ')[2] !== undefined )))))) 
              {
                if (
                  (
                    !checkListColumn.includes(String(ItemArray[split*i+j]).split(' ')[0]) &&
                    !checkListColumn.includes(String(ItemArray[split*(i+1)+j]).split(' ')[0]) &&
                    !checkListColumn.includes(String(ItemArray[split*(i+2)+j]).split(' ')[0]) &&
                    !checkListColumn.includes(String(ItemArray[split*(i+3)+j]).split(' ')[0]) 
                  )  || checkListColumn.length === 0
                ) {
                  red ? setRedScore(redScore + 1) : setYellowScore(yellowScore + 1)
                    toast.success(`${red ? 'Red' : 'Yellow'} Completed a column`, {
                      position: toast.POSITION.BOTTOM_RIGHT,
                      className: `toast background-${red ? ('red') : 'yellow'}`
                    })
                  checkListColumn.push(
                    String(ItemArray[split*i+j]).split(' ')[0],
                    String(ItemArray[split*(i+1)+j]).split(' ')[0],
                    String(ItemArray[split*(i+2)+j]).split(' ')[0],
                    String(ItemArray[split*(i+3)+j]).split(' ')[0]
                    )
                    // console.log(ItemArray)
                    // console.log(checkListColumn)
                }
            }
        }
      }
      /////////////
      for (let i =0 ; i<= 2 ; i++) {
        // top-right to bottom-left digonals
        for ( let j=3; j<= 6; j++){
            // console.log(`${ItemArray[split*i+j]} ${ItemArray[split*(i+1)+j-1]} ${ItemArray[split*(i+2)+j-2]} ${ItemArray[split*(i+3)+j-3]}`)
          if (
            (String(ItemArray[split*i+j]).split(' ')[2] === String(ItemArray[split*(i+1)+j-1]).split(' ')[2]) &&
            (String(ItemArray[split*(i+1)+j-1]).split(' ')[2] === String(ItemArray[split*(i+2)+j-2]).split(' ')[2]) &&
            (String(ItemArray[split*(i+2)+j-2]).split(' ')[2] === String(ItemArray[split*(i+3)+j-3]).split(' ')[2]) &&
            String(ItemArray[split*i+j]).split(' ')[2] !== undefined 
          ){
            if (
              (
                !checkListFirstDgonal.includes(String(ItemArray[split*i+j]).split(' ')[0]) &&
                !checkListFirstDgonal.includes(String(ItemArray[split*(i+1)+j-1]).split(' ')[0]) &&
                !checkListFirstDgonal.includes(String(ItemArray[split*(i+2)+j-2]).split(' ')[0]) &&
                !checkListFirstDgonal.includes(String(ItemArray[split*(i+3)+j-3]).split(' ')[0]) 
              )  || checkListFirstDgonal.length === 0
            ) {
              toast.success(`${red ? 'Red' : 'Yellow'} Completed a digonal`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: `toast background-${red ? ('red') : 'yellow'}`
              })
              checkListFirstDgonal.push(
              String(ItemArray[split*i+j]).split(' ')[0],
              String(ItemArray[split*(i+1)+j-1]).split(' ')[0],
              String(ItemArray[split*(i+2)+j-2]).split(' ')[0],
              String(ItemArray[split*(i+3)+j-3]).split(' ')[0]
              )
              // console.log(ItemArray)
              console.log(checkListFirstDgonal)
              red ? setRedScore(redScore + 1) : setYellowScore(yellowScore + 1)
            }
          }
        }
    }
    ////////////////
   
    for (let i =0 ; i<= 2 ; i++) {
      // top-left to bottom-right digonals
      for ( let j=0; j<= 3; j++){
          // console.log(`${ItemArray[split*i+j]} ${ItemArray[split*(i+1)+j+1]} ${ItemArray[split*(i+2)+j+2]} ${ItemArray[split*(i+3)+j+3]}`)
        if (
          (String(ItemArray[split*i+j]).split(' ')[2] === String(ItemArray[split*(i+1)+j+1]).split(' ')[2]) &&
            (String(ItemArray[split*(i+1)+j+1]).split(' ')[2] === String(ItemArray[split*(i+2)+j+2]).split(' ')[2]) &&
            (String(ItemArray[split*(i+2)+j+2]).split(' ')[2] === String(ItemArray[split*(i+3)+j+3]).split(' ')[2]) &&
            String(ItemArray[split*i+j]).split(' ')[2] !== undefined 
        ){
          if (
            (
              !checkListSecondDgonal.includes(String(ItemArray[split*i+j]).split(' ')[0]) &&
              !checkListSecondDgonal.includes(String(ItemArray[split*(i+1)+j+1]).split(' ')[0]) &&
              !checkListSecondDgonal.includes(String(ItemArray[split*(i+2)+j+2]).split(' ')[0]) &&
              !checkListSecondDgonal.includes(String(ItemArray[split*(i+3)+j+3]).split(' ')[0]) 
            )  || checkListSecondDgonal.length === 0
          ){
            // console.log('second digonal')
            toast.success(`${red ? 'Red' : 'Yellow'} Completed a digonal`, {
              position: toast.POSITION.BOTTOM_RIGHT,
              className: `toast background-${red ? ('red') : 'yellow'}`
            })
            checkListSecondDgonal.push(
            String(ItemArray[split*i+j]).split(' ')[0],
            String(ItemArray[split*(i+1)+j+1]).split(' ')[0],
            String(ItemArray[split*(i+2)+j+2]).split(' ')[0],
            String(ItemArray[split*(i+3)+j+3]).split(' ')[0]
            )
            red ? setRedScore(redScore + 1) : setYellowScore(yellowScore + 1)
            // console.log()
          }
        }
      }
  }
  console.log(red)
    }

  const enter = (index) => {
    console.log(String(ItemArray[index+(split*0)]).split(' ')[2])
    if ( String(ItemArray[index+(split*0)]).split(' ')[2] !== undefined ) {
      return toast('Yo slow down that column is already full',{
        position: toast.POSITION.BOTTOM_RIGHT,
        className:'full-row-toast toast'
      })
      // return ''
    }
    let changed = false
    // function to check if the elements are empty and changing color classes
    for (let i = 0; i <= 5; i++) {
      var element = String(ItemArray[split*i+index])
      if ( 
        element.includes('yellow') ||
        element.includes('red')
        ) {
          ItemArray[ split * ( i - 1 ) +index ] += ` circle ${red ? 'red' : 'yellow'}`
          setRed(!red)
          changed = true
          return
        }
    }
    if (!changed) {
      ItemArray[split*5+index] += ` circle ${red ? 'red' : 'yellow'}`
      // console.log("changing outside")
      setRed(!red)
    }
    // console.log(ItemArray)
  }

  
  return (
    <div className="App">
      <header className="App-header">
        <div className='game'>            
        {
          new Array(7).fill('enter-button').map( (i,index) => {
            return (<div onClick={ () => {
                enter(index)
                checkWin()
            } }>
              <Button title='' />

            </div>)
          })
        }
          {
            ItemArray.map( (item, index) => {
              
              return <Icon title={item} key={index} className={item}/>
            })
          }
        </div>
        <Score redSrore={redScore} yellowScore={yellowScore} />
        <InfoButton ItemArray={ItemArray}/>
      </header>
      <ToastContainer/>
    </div>
  );
}


export default App;

