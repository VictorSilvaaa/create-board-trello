import react,  {useEffect, ReactElement, useState, FormEvent } from 'react';
import Logo from '../../assets/images/logo.svg';
import { useHistory } from 'react-router-dom';

//style
import './index.css'
import warningIcon from "../../assets/images/icons/warning.svg";

//request 
import api from '../../services/api';

//FORMS COMPONENTS
import Input from '../../components/input';
import Checkbox from '../../components/checkbox'
import Textarea from '../../components/textarea'
import Select from '../../components/Select'


const Landing = ():ReactElement  => {

    //abreviação url
    const url =`?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`

    //dices user
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [cor, setCor] = useState('');
    const [skills, setskills] = useState('');
    


    async function initCreate(e:FormEvent) {
      e.preventDefault();
      await createCard();
    }
      //function create a board
      async function createBoard() {    
          const responseCreateBoard = await api.post(`boards/${url}&name=${name}&prefs_permissionLevel=public`);              

          return responseCreateBoard.data.id;
      }
      //create list on board
      async function createList() {
        let idBoard= await createBoard();
        const responseCreateList = await api.post(`lists/${url}&name=${name}&idBoard=${idBoard}`); 
        
        return responseCreateList.data.id;
      }

      //create card on list of board
      async function createCard() {
        let idList = await createList();
        const responseCreateCard = await api.post(`cards${url}&idList=${idList}&name=MeusDados&desc=${description}`); 
        
      }

    return(
      <div className="Landing">
          <img src={Logo} alt="logo-trello" id="logo-trello"/>
          
          <h3>Prencha o formulário abaixo e crie seu board  no trello :)</h3>
          
          <main >
              <form id="formulario" onSubmit={initCreate}> 

              <div className="inputs-text">
                <Input
                    required
                    name="userName"
                    label="Digite seu nome"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}>
                </Input>
                <Input
                    name="userEmail"
                    label="Email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}>
                </Input>
                <Textarea
                    required
                    name='userDescription'
                    label='Descrição'
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}>
                </Textarea>
              </div>
               

               
                <div className="checkboxs">
                    <Checkbox
                        name='option1'
                        label='Opção 1'
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}>
                    </Checkbox>
                    <Checkbox
                        name='option2'
                        label='Opção 2'
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}>
                    </Checkbox>
                    <Checkbox
                        name='option3'
                        label='Opção 3'
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}>
                    </Checkbox>
                </div>
             
                
                <Select
                  //required
                  name="sex"
                  label="Escolha uma cor para decorar"
                  value={cor}
                  onChange={(e) => { setCor(e.target.value) }}
                  options={[
                  {value: "red", label: "Vermelho" },
                  {value: "blue",  label: "Azul" },
                  {value: "gree",  label: "Verde" },]}   
                ></Select>
               

                <div className="skills">
  
                 <input 
                    type="radio" 
                    id="web" 
                    placeholder='web' 
                 />
                 <input 
                    type="radio"
                    id='designer'

                    placeholder='Designer'/>
                 <input 
                    type="radio" 
                    id='icon' 
                    placeholder='Icon'/>
              </div>
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso Importante" />
            Importante <br />
            Preencha todos os dados
          </p>

          <button type="submit" >Salvar cadastro</button>
          
        </footer>
      
       
            </form>   
      </main>
    </div>
    );
}
export default Landing;