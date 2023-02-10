import React from 'react'


const ScrollBottom = (props)=>{
    const [ state, setState ] = React.useState({ scrollHeight: 0 })
    const { watcher, containerRef, children } = props


    React.useEffect(()=>{
        if(containerRef){
            if(containerRef.current){
                let scrollHeight = containerRef.current.scrollHeight
                setState({  scrollHeight: scrollHeight })
                containerRef.current.scrollTop = state.scrollHeight
            } else {
                let scrollHeight = containerRef.scrollHeight
                setState({ scrollHeight: scrollHeight })
                containerRef.scrollTop = state.scrollHeight
            }
        }

    }, [state.scrollHeight, watcher])

    return (
        <React.Fragment>{children}</React.Fragment>
    )
}





export default ScrollBottom