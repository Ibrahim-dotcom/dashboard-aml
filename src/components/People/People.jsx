import { useEffect, useState } from "react"
import {FaBars, FaCaretDown} from "react-icons/fa"
import './People.css'

function People() {
    const [list, setList] = useState([])
    const [showDropDown, setDropDown] = useState(false)
    const [formData, setFormData] = useState({})

    function getData(){
        return fetch('MOCK_DATA.json').then(data => data.json())
    }

    const getDate = () =>{
        return new Date().toISOString().slice(0,9);
    }
    useEffect(() =>{
        getData().then(items =>setList(items))
    }, [])
    
    function handleSubmit(evt){
        evt.preventDefault();
        const data = new FormData(evt.target)
        let formObject = Object.fromEntries(data.entries())
        formObject ={
            [formObject.field1]: formObject.input1,
            [formObject.field2]: formObject.input2,
            [formObject.field3]: formObject.input3,

        }
        setFormData(formObject)
        setList(list.filter(item =>searchFilter(item)))
    }

    function searchFilter(item){
        if(Object.keys(formData).length == 0) return true;
        for(const key in formData){
            const currentFormProp = formData[key]?.toLowerCase();
            const currentItemProp =item[key]?.toLowerCase();
            if(currentFormProp == currentItemProp) return true;
        
        }
        return false
    }
    return(
        <section id = 'people-wrapper'>
            <div id = 'people-top-bar'>
                <FaBars id = 'bars'/>
                <div id = 'search' onClick={() => setDropDown(!showDropDown)}>
                    <p>Change Search Conditions <span><FaCaretDown color="black"/></span></p>
                </div>
            </div>
            {
                showDropDown &&
                <div id = 'drop-down'>
                    <form action="" method="get" onSubmit={handleSubmit}>

                        <h4>Change Search Conditions</h4>

                        <label htmlFor="field1">
                           <p>Field: </p>
                            <select name="field1">
                                <option value="first_name">First Name</option>
                                <option value="Other_name">Other Name</option>
                                <option value="gender">Gender</option>
                                <option value="last_name">Surname</option>
                                <option value="Date_action">Date Action</option>
                                <option value="birth-place">Birth Place</option>
                                <option value="Maiden_name">Maiden Name</option>
                                <option value="Address">Address Line</option>
                                <option value="Roles">Roles</option>
                                <option value="Country">Country</option>
                                <option value="Voters_card">Voter's Card</option>
                            </select>

                            <p>Value: </p>
                            <input type="text" name = 'input1' className= "value"/>
                        </label>
                        <label htmlFor="field2">
                                <p>Field: </p>
                                <select name="field2">
                                    <option value="gender">Gender</option>
                                    <option value="first_name">First Name</option>
                                    <option value="Other_name">Other Name</option>
                                    <option value="last_name">Surname</option>
                                    <option value="Date_action">Date Action</option>
                                    <option value="birth-place">Birth Place</option>
                                    <option value="Maiden_name">Maiden Name</option>
                                    <option value="Address">Address Line</option>
                                    <option value="Roles">Roles</option>
                                    <option value="Country">Country</option>
                                    <option value="Voters_card">Voter's Card</option>
                                </select>
                                <p>Value: </p>
                                <input type="text" className ="value" name="input2"/>
                        </label>
                        <label htmlFor="field3">
                            <p>Field: </p>
                            <select name="field3">
                                <option value="Country">Country</option>
                                <option value="first_name">First Name</option>
                                <option value="Other_name">Other Name</option>
                                <option value="gender">Gender</option>
                                <option value="last_name">Surname</option>
                                <option value="Date_action">Date Action</option>
                                <option value="birth-place">Birth Place</option>
                                <option value="Maiden_name">Maiden Name</option>
                                <option value="Address">Address Line</option>
                                <option value="Roles">Roles</option>                                <option value="Voters_card">Voter's Card</option>
                            </select>
                            <p>Value: </p>
                            <input type="text" className = "value" name="input3"/>
                        </label>
                        <button type="reset">Clear Values</button>
                        <button type="submit">Search</button>
                    </form>
                </div>
            }
            <div id = 'persons'>
                <p>Persons</p>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Action</th>
                        <th>Action Date</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Deceased</th>
                        <th>Birth Place</th>
                        <th>Address Line</th>
                        <th>Address City</th>
                        <th>Address Country</th>
                        <th>Name Type</th>
                        <th>Title Honourific</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>SurName</th>
                        <th>Maiden Name</th>
                        <th>Other Name</th>
                        <th>Option</th>
                    </tr>
                    {
                       list.map(item =>(
                            <tr key= {String(item['id'])}>
                                <td>{item['id']}</td>
                                <td>Add</td>
                                <td>{item['Date_action'].replace(/\//g, '')}</td>
                                <td>{item['gender']}</td>
                                <td>Active</td>
                                <td></td>
                                <td>{item['Date_action']}</td>
                                <td>{item['Address']}</td>
                                <td>{item['Address_city']}</td>
                                <td>{item['Country']}</td>
                                <td></td>
                                <td>{item['Title']}</td>
                                <td>{item['first_name']}</td>
                                <td>{item['Other_name']}</td>
                                <td>{item['last_name']}</td>
                                <td>{item['Maiden_name']}</td>
                                <td></td>
                                <td></td>
                            </tr>
                       )) 
                    }
                </table>
            </div>
            <div id="numbers-description">
                <div id="numbers">
                    <p>Numbers</p>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Doc Type</th>
                            <th>Values</th>
                        </tr>
                        {
                            list.map(item =>(
                                <tr key={String(item.id)}>
                                    <td>{item.id}</td>
                                    <td>Voters Card</td>
                                    <td>{item['Voters_card']}</td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            
                <div id="descriptions">
                    <p>Description</p>
                    <table>
                    <tr>
                        <th>id</th>
                        <th>Descr ID</th>
                        <th>Description</th>
                   </tr>
                    {
                        list.map(item =>(
                            <tr key= {String(item.id)}>
                               <td>{item.id}</td> 
                               <td>1</td>
                               <td>Politically Exposed Person(PEP) </td>
                            </tr>
                        ))
                    }
                   </table>
                </div>
                <div id="countries">
                    <p>Countries</p>
                    <table>
                       <tr>
                        <th>ID</th>
                        <th>Country type</th>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>PM code</th>
                       </tr>
                       {
                        list.map(item =>(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>Citizenship</td>
                                <td>{item['Country']}</td>
                                <td></td>
                                <td>{item.Country.slice(0,2)}</td>
                            </tr>
                        ))
                       }
                    </table>
                </div>
                <div id= "date">
                    <p>Date</p>
                    <table>
                        <tr>
                            <th>id</th>
                            <th>Date type</th>
                            <th>Date Pm</th>
                        </tr>
                        {
                            list.map(item =>(
                                <tr key = {item.id}>
                                    <td>{item.id}</td>
                                    <td>Date inactive</td>
                                    <td>{item['Date_action'].replace(/\//g,'')}</td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </div>
            <div id ='sanctions-roles'>
                <div id="sanctions">
                    <p>Sanctions</p>
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>list Code</th>
                            <th>Date start</th>
                            <th>Date stop</th>
                            <th>S-name</th>
                            <th>Status</th>
                            <th>RT</th>
                            <th>Descr</th>
                            <th>Descr1</th>
                        </tr>
                        {
                            list.map(item =>(
                                <tr key= {item.id}>
                                    <td>{item.id}</td>
                                    <td>PEP</td>
                                    <td>{item['Date_action'].replace(/\//g,'')}</td>
                                    <td>{item['Date_action'].replace(/\//g,'')}</td>
                                    <td>RU</td>
                                    <td>Active</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
                <div id = 'roles'>
                        <p>Roles</p>
                        <table>
                            <tr>
                                <th>id</th>
                                <th>Name</th>
                                <th>Role type</th>
                                <th>Start Date</th>
                                <th>Stop Date</th>
                                <th>Code</th>
                                <th>Title</th>
                            </tr>
                            {
                                list.map((item, index) =>(
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td></td>
                                        <td>{item['Roles']}</td>
                                        <td>{item['Date_action'].replace(/\//g,'')}</td>
                                        <td></td>
                                        <td>{index+1}</td>
                                        <td>{item['Roles']}</td>
                                    </tr>
                                ))
                            }
                        </table>
                </div>
            </div>
            <div id = 'associate'>
                <p>Associates</p>
                <table>
                    <tr>
                        <th>Id</th>
                        <th>Assoc Id</th>
                        <th>Ex</th>
                        <th>Type</th>
                        <th>Rel Name</th>
                        <th>Action</th>
                        <th>Date Action</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Birth Place</th>
                        <th>Address Line</th>
                        <th>Address City</th>
                        <th>Address Country</th>
                        <th>Name Type</th>
                        <th>Title Honourifi</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Surname</th>
                        <th>Maiden Name</th>
                        <th>Suffix</th>
                        <th>Options</th>
                    </tr>
                </table>
            </div>
        </section>
    )
}

export default People