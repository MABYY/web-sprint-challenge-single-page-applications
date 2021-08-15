import React,{useState,useEffect} from "react";
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

const FormPizza = () => {
  // Set initial values
  const [formState, setFormState] = useState(
    { 
      nameinput:"", 
      sizedropdown:"", 
      enterpass:"", 
      top_cheese: false, tomatosause:false, mushrooms:false, turkey:false,
      specialtext: "None",
      agree: false,
    })

  // Set submit button place order initially disabled
  const [disabled, setDisabled] = useState(true);

  // Keep track of errors
  const [errors, setErrors] = useState({
        nameinput:"", 
        sizedropdown:"", 
        enterpass:"", 
        top_cheese: false, tomatosause:false, mushrooms:false, turkey:false,
        specialtext: "None",
        agree: false,
    })

      // Keep post to render it to the screen
  const [post, setPost] = useState([]);

    // Keep track of orders
  const [orders, setOrders] = useState([]);

  // Define form schema for yup

  const formSchema = yup.object().shape({
    nameinput: yup.string().min(2,"Name must be at least 2 characters").required("Name is Required"),
    sizedropdown: yup.string().required("Enter the size of your pizza"),
    specialtext: yup.string(),
    top_cheese: yup.boolean(), tomatosause: yup.boolean(),mushrooms: yup.boolean(),turkey: yup.boolean(),
    agree: yup.boolean().oneOf([true], "Make sure you have selected all the toppings") 
  })


  // Keep track of error made by the user while completing the form
  const setFormErrors = (name,value) =>{
    yup.reach(formSchema, name).validate(value)
    .then(valid => { setErrors({...errors, [name]: ""});
    })
    .catch(err => {
        console.log('errooorrsss', err.errors)
        setErrors({...errors, [name]: err.errors[0]});
    });
}


  const changeFc = e =>{
    e.persist(); 

    setFormState({...formState, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value})
    setFormErrors(e.target.name, e.target.type === "checkbox" ? e.target.checked : e.target.value)

    console.log(formState)
    console.log(errors)

    };

  useEffect(() => {

    formSchema.isValid(formState).then(valid => {
      setDisabled(!valid);
    });
  }, [formState]);


  const formSubmit = (e) => {
    e.preventDefault();
    setOrders([...orders,formState])

        // send out POST request with obj as second param, for us that is formState.
        axios
        .post("https://reqres.in/api/users", formState)
        .then(response => {
          setPost(response.data);
          setFormState({ 
            nameinput:"", 
            sizedropdown:"", 
            enterpass:"", 
            top_cheese: false, tomatosause:false, mushrooms:false, turkey:false,
            specialtext: "None",
            agree: false,});
        })
        .catch(err => {
          console.log(err);
        });

  };

    return (
    <div > 
    <br></br>
    <br></br>
    <h1 style={{color:"omato"}}>Design your pizza</h1>
    
    <br></br>
    <br></br>
    

    <form onSubmit={formSubmit} >
      <label id="name-input"> Customer name:  
      <input id = "name-input" 
              value={formState.nameinput} 
              name ='nameinput'
              data-cy = 'nameinput'
              type="text"
              onChange={changeFc}/>
      </label>
      <div style ={{color:'red'}}>{errors.nameinput}</div>
      <br></br>
      <br></br>

      <label> Pick the size of your pizza: </label> 
      <select id = 'size-dropdown' name = 'sizedropdown'value={formState.sizedropdown} data-cy = "sizedropdown" data-cy = 'sizedropdown' onChange={changeFc} >
          <option value = '' > --Pick size -- </option>
          <option value = 'Regular' > Regular </option>
          <option value = 'Large' > Large </option>
          <option value = 'Extra_Large' > Extra Large </option>
        </select>
        <div style ={{color:'red'}}>{errors.sizedropdown}</div>
       <br></br>
      <br></br>

      <label id="size-dropdown"> Choose your toppings : </label>
      <br></br>
      <br></br>
          <label> {" "} Cheese
            <input name="top_cheese" value = "true" checked={formState.top_cheese} data-cy = "top_cheese" type="checkbox" onChange={changeFc} />
          </label> 
          <br></br>

          <label> {" "} Tomato Sauce
            <input name="tomatosause" value = "true" checked={formState.tomatosause} data-cy = "tomatosause" type="checkbox" onChange={changeFc}/>
          </label> 
          <br></br>

          <label> {" "} Mushrooms
            <input name="mushrooms" value = "true" checked={formState.mushrooms} data-cy = "mushrooms" type="checkbox" onChange={changeFc}/>
          </label> 
          <br></br>

          <label> {" "} Turkey
            <input name="turkey" value = "true" checked={formState.turkey} data-cy = "turkey" type="checkbox"  onChange={changeFc}/>
          </label> 
          <br></br> 

      <label> Have you selected all the topics you want?
                  <input type = 'checkbox'  
                  name ="agree" 
                  checked={formState.agree} 
                  data-cy = 'agree'
                  onChange={changeFc} />
      </label>
      <div style ={{color:'red'}}>{errors.agree}</div>
      <br></br>
      <br></br>

      <label htmlFor="special-text" > Any special instructions?  </label>
      <textarea id = "special-text" name = "specialtext" value ={formState.specialtext} data-cy = "specialtext"  type="body" onChange={changeFc}/>
      <br></br>
      <br></br>


      <button  id ="order-button" name ="orderbutton" disabled ={disabled} data-cy = "orderbutton" type ="submit"> Order your pizza </button>
      <br></br>
      <br></br>
      <pre>{JSON.stringify(post,null,2)}</pre>
    </form>
    
    </div>
    );
  };
export default FormPizza;