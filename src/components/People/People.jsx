import { useEffect, useState } from "react"
import {Link} from "react-router-dom";
import {FaBars, FaCaretDown,FaShareAlt, FaRedo, FaRedoAlt,FaTimes,FaRegWindowMaximize} from "react-icons/fa"
import './People.css'

function People() {
    const [list, setList] = useState([])
    const [showDropDown, setDropDown] = useState(false)
    const [currentItem, setCurrentItem] = useState([])
    const [displayedList, setDisplayedList] = useState([])
    const [showExtraInfo, toggleExtraInfo] = useState(true);
    const [showImages, setShowImages] = useState(false);
    const [imageId, setImageId] = useState('')

    useEffect(() =>{
        let mounted = true;
        getData()
            .then(items =>{
                if(mounted){
                    setList(items);
                    setDisplayedList(items.slice());
                }
            })
        return () => mounted = false;
    }, [])  
    
    function getData(){
        return fetch('MOCK_DATA2.json').then(data => data.json())
    }

    const getDate = () =>{
        return new Date().toISOString().slice(0,9);
    }
    let formObjectArranged;
    
    function handleSubmit(evt){
        evt.preventDefault();
        const data = new FormData(evt.target)
        let formObject = Object.fromEntries(data.entries())
        formObjectArranged ={
            [formObject.field1]: formObject.input1,
            [formObject.field2]: formObject.input2,
            [formObject.field3]: formObject.input3
        }
        setDisplayedList(list.filter(searchFilter))
        toggleExtraInfo(false)
    }

    function searchFilter(item){
        let isMatch = true
        if(Object.keys(formObjectArranged).length == 0) return true;
        for(const key in formObjectArranged){
            const currentFormProp = formObjectArranged[key]?.toLowerCase();
            const currentItemProp =item[key]?.toLowerCase();
            if(currentFormProp == '' || currentItemProp == '') continue;
            if(currentFormProp != currentItemProp) isMatch = false;
        
        }
        return isMatch;
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
                    <form onSubmit={handleSubmit}>

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
                                <option value="Roles">Roles</option>
                                <option value="Voters_card">Voter's Card</option>
                            </select>
                            <p>Value: </p>
                            <input type="text" className = "value" name="input3"/>
                        </label>
                        <button type="reset">Clear Values</button>
                        <button type="submit">Search</button>
                    </form>
                </div>
            }

            {
                showImages &&
                <div id="images">
                    <div>
                    <p>Images</p>
                    <div id="images-icons">
                        <FaRedo/><FaRegWindowMaximize/><FaTimes onClick={()=>setShowImages(false)}/>
                    </div>
                    </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            displayedList.
                                find(item => item?.id == imageId)['links'].
                                    map(link=>(
                                        <tr key={link}>
                                            <td>{imageId}</td>
                                            <td><Link to={link}>{link}</Link></td>
                                            
                                        </tr>
                                    ))


                        }
                    </tbody>
                </table>
               </div>
            }
            
            <div id = 'persons'>
                <p>Persons</p>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Action</th>
                            <th>Action Date</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Deceased</th>
                            <th>BirthPlace</th>
                            <th>Address Line</th>
                            <th>Address City</th>
                            <th>Address Country</th>
                            <th>Name Type</th>
                            <th>Title Honourif</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>SurName</th>
                            <th>Maiden Name</th>
                            <th>OtherName</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        displayedList.map(item =>(
                                <tr key= {String(item['id'])} id = {item.id} className ='people' 
                                    onClick ={evt => {
                                        document.querySelectorAll('.people')
                                            .forEach(trNode =>
                                                trNode.style.backgroundColor = ''
                                        )
                                        setCurrentItem([item]);
                                        toggleExtraInfo(true);
                                        evt.target.closest('tr').style.backgroundColor = 'rgb(250, 255, 173)';
                                        }
                                    }
                                    
                                >
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
                                    <td><FaBars className="icons" onClick={
                                            ()=>{
                                                setImageId(item?.id);
                                                setShowImages(true);

                                            }}/>
                                        <FaShareAlt className="icons"/></td>
                                </tr>
                        )) 
                        }
                    </tbody>
                </table>
                
            </div>
            <div id="numbers-description">
                <div id="numbers">
                    <p>Numbers</p>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Doc Type</th>
                                <th>Values</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                showExtraInfo &&
                                currentItem.map(item =>(
                                    <tr key={String(item.id)}>
                                        <td>{item.id}</td>
                                        <td>Voters Card</td>
                                        <td>{item['Voters_card']}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            
                <div id="descriptions">
                    <p>Description</p>
                    <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Descr ID</th>
                            <th>Description</th>
                        </tr>
                   </thead>
                   <tbody>
                        {
                            showExtraInfo &&
                            currentItem.map(item =>(
                                <tr key= {String(item.id)}>
                                <td>{item.id}</td> 
                                <td>1</td>
                                <td>Politically Exposed Person(PEP) </td>
                                </tr>
                            ))
                        }
                    </tbody>
                   </table>
                </div>
                <div id="countries">
                    <p>Countries</p>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Country type</th>
                                <th>Name</th>
                                <th>Rating</th>
                                <th>PM code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                showExtraInfo &&
                                currentItem.map(item =>(
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>Citizenship</td>
                                        <td>{item['Country']}</td>
                                        <td></td>
                                        <td>{item.Country.slice(0,2)}</td>
                                    </tr>
                                ))
                            }
                       </tbody>
                    </table>
                </div>
                <div id= "date">
                    <p>Date</p>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Date type</th>
                                <th>Date Pm</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            showExtraInfo &&
                            currentItem.map(item =>(
                                <tr key = {item.id}>
                                    <td>{item.id}</td>
                                    <td>Date inactive</td>
                                    <td>{item['Date_action'].replace(/\//g,'')}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div id ='sanctions-roles'>
                <div id="sanctions">
                    <p>Sanctions</p>
                    <table>
                        <thead>
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
                        </thead>
                        <tbody>
                            {
                                showExtraInfo &&
                                currentItem.map(item =>(
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
                        </tbody>
                    </table>
                </div>
                <div id = 'roles'>
                        <p>Roles</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Role type</th>
                                    <th>Start Date</th>
                                    <th>Stop Date</th>
                                    <th>Code</th>
                                    <th>Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    showExtraInfo &&
                                    currentItem.map((item, index) =>(
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
                            </tbody>
                        </table>
                </div>
            </div>
            <div id = 'associate'>
                <p>Associates</p>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Assoc Id</th>
                        <th>Ex</th>
                        <th>Type</th>
                        <th>Rel Name</th>
                        <th>Action</th>
                        <th>Date Action</th>
                        <th>Gender</th>
                        <th>ActiveStatus</th>
                        <th>Deceased</th>
                        <th>BirthPlace</th>
                        <th>Address Line</th>
                        <th>Address City</th>
                        <th>Address Country</th>
                        <th>Name Type</th>
                        <th>Title Honourific</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Surname</th>
                        <th>Maiden Name</th>
                        <th>Suffix</th>
                        <th>OtherName</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            showExtraInfo &&
                            list.filter((item, index) =>{
                                console.log(currentItem[0])
                                if(!currentItem[0]) return false;
                               return currentItem[0]['associates']?.includes(item?.id)
                            }).map(item =>( 
                                <tr key={item.id}>
                                    <td>{currentItem[0].id}</td>
                                    <td>{item['id']}</td>
                                    <td>No</td>
                                    <td>Person</td>
                                    <td></td>
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
                                    <td><FaRedoAlt onClick={evt =>{
                                        setDisplayedList([item]);
                                        toggleExtraInfo(false);
                                    }} className="icons"/><FaShareAlt className="icons"/></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default People