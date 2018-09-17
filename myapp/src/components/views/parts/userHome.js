/* 
 * @author Arnold Jiadong Yu
 * @name userHome
 * @package parts
 * @description Simple text displayed once user and admin signed in.
 */


import React from "react";


const style = {
    textAlign: 'center',
    width: '60%',
    margin: '250px auto 250px auto'
};

export default class home extends React.Component {
        
        
        
        render(){
            return(
                    
                    <div style = {style}>   
                    
                    <h2>Wecome to HatBoxPhoto!</h2>
                    
                    </div>
                    
                    
                    )
        }
}