import {useNavigate} from 'react-router-dom';
import './Menu.css'
import {FaTools} from 'react-icons/fa'
function Menu() {
    const getDate = () =>{
        return new Date().toISOString().slice(0,9);
    }
    const navigate = useNavigate()
    return(
        <section className="wrapper" id="menu-wrapper">
            <div className='top-bar'><h2>Dashboard</h2> <p>login-Data: {getDate()}</p></div>
            <div id='dropdown-wrapper'>
                <button id = "menu-button">Menu</button> szukaj: 
                <select name="name" id="">
                    <option value="GRP">GRP</option>
                    <option value="name">labalaba</option>
                    <option value="asdfg">ASDFG</option>
                </select>
                <input type = "text"></input>
                <button>Go</button>
            </div>
            <div>
                <p>Rokordov: 2 Strona: 2 inne: <span>[1]</span></p>
                <table>
                    <tr>
                        <th>GRP</th>
                        <th>Id</th>
                        <th>Stan</th>
                        <th>Nazwa</th>
                        <th>Opis</th>
                        <th>Login</th>
                        <th></th>
                    </tr>
                    
                    <tr onClick={()=>(navigate('/people'))}>
                    
                            <td>ADM</td>
                            <td></td>
                            <td>On</td>
                            <td>Person</td>
                            <td>Person Monitoring</td>
                            <td>Telep</td>
                            <td><FaTools/></td>
                            
                    </tr>
                    
                    <tr>
                        <td>ADM</td>
                        <td> </td>
                        <td>On</td>
                        <td>Person</td>
                        <td>Person Monitoring</td>
                        <td>Kekere</td>
                        <td><FaTools/></td>
                    </tr>
                </table>
                <p>Rokordov: 2 Strona: 2 inne: <span>[1]</span></p>

            </div>
        </section>
    )
}

export default Menu