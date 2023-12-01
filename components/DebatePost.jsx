import React from "react"
import PostComments from "./PostComments"
import PostContent from "./PostContent"
import postData from "../postData"
import {nanoid} from "nanoid"

export default function DebatePost() {
    
/* Challenge 

The form doesn't work. Your task is to make it a controlled form that adds a comment to the post when the user clicks "Send."

    1. The comment should appear on the bottom of the comment thread, with the inputted 
       username and comment text displayed just like the previous comments. 
       
    2. The comment should be added to the array that contains the data for the previous 
       comments. 
    
    3. The inputted username should be recorded, but it should show up as "AnonymousUser" if 
       the user checks the checkbox.
    
    4. The user should have to input text into the text input element and comment box element to 
       submit the form, and the elements and the checkbox should clear out after the user submits a comment. They should be empty on page load as well.   
        
    5. Your code can live entirely inside this file, although you are welcome to move things around 
       if you'd like. 
*/
    
    const DEFAULT_FORM_DATA = {
        id: nanoid(), 
        userName: "",
        comment: "",
        isAnonymous: false
    }
    
    const [comments, setComments] = React.useState(postData.comments)
    const [userInput, setUserInput] = React.useState(DEFAULT_FORM_DATA)
    
    const handleOnChange = (event) =>{
         const {name, value, type} = event.target
      
         setUserInput(prevInput =>({
             ...prevInput,
             [name]:  type === "checkbox"? !prevInput.isAnonymous : value
         }))
    }
    
    const addComment = (e) =>{
        e.preventDefault()
        setComments(prevComments => [...prevComments,{id: userInput.id, userName: userInput.userName, commentText: userInput.comment, isAnonymous: userInput.isAnonymous }])
        setUserInput(DEFAULT_FORM_DATA)
    }
    
    return (
        <div className="post-container">
            <PostContent data={{...postData}} />
            <PostComments data={comments} />
            <form onSubmit={addComment}>
                <input
                    className="text-input"
                    type="text"
                    placeholder="Enter username."
                    name="userName"
                    onChange={handleOnChange}
                    value={userInput.userName}
                    required
                />
                <textarea
                    placeholder="What do you think?"
                    name="comment"
                    onChange={handleOnChange}
                    value={userInput.comment}
                    required
                />
                <label>
                    <input 
                        className="checkbox"
                        type="checkbox"
                        name="isAnonymous"
                        checked={userInput.isAnonymous}
                        onChange={handleOnChange}
                    />
                    Post anonymously?
                </label>
                <button>Send</button>
            </form>
        </div>
    )
}
