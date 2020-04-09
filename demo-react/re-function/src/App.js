import React, {useEffect, useState} from 'react';

const  App  = props => {
  const [childVisible, setChildVisible] = useState(true)
  const hide = ()=>{
    setChildVisible(false)
  }
  const show = ()=>{
    setChildVisible(true)
  }
  return (
    <div>
      {childVisible?<button onClick={hide}>hide</button>: <button onClick={show}>show</button>}
      {childVisible?<Child/>:null}
    </div>
  )
}

const Child = props => {
  useEffect(()=>{
    return ()=>{
      console.log('child 销毁')
    }
  })
  return (
    <div>Child</div>
  )
}

export default App;
