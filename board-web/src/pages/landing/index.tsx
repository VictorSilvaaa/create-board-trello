import react,  {useEffect, ReactElement, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
//style
import './index.css'
//images/icons
import warningIcon from "../../assets/images/icons/warning.svg";
import successIcon from '../../assets/images/icons/success-check-icon-2.svg';
import failedIcon from '../../assets/images/icons/failedIcon.svg';
import Logo from '../../assets/images/logo.svg';
//request 
import api from '../../services/api';
//FORMS COMPONENTS
import Input from '../../components/input';
import Checkbox from '../../components/checkbox'
import Textarea from '../../components/textarea'
import Select from '../../components/Select'
import RandomScreen from "../../components/randomScreen/";



const Landing = ():ReactElement => {

    //abreviação url
    const url =`?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`
    //for redirect 
    const history = useHistory();
    const [randomScreen, setRandomScreen] = useState('');
 
    //dices user
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [cor, setCor] = useState('');
    const [idade, setIdade] = useState('aaa');

    let urlBoard = '';
    //start process of create board, card, list, labels
    async function initCreate(e:FormEvent) {
      e.preventDefault();
       const responseInitCreate = await createLabels()
       .then(() => {
        setRandomScreen('success');
        setTimeout(()=>{
          window.open(`${urlBoard}`, "minhaJanela", '_blank');
        
        }, 2000);
       }).
      catch(() => {
        setRandomScreen('failed');
        setTimeout(()=>{
          history.push('/')
        }, 4500);
      });
    
    }
      //function create a board
      async function createBoard() {    
          const responseCreateBoard = await api.post(`boards/${url}&name=${name}&prefs_permissionLevel=public`);              
          urlBoard = responseCreateBoard.data.url;
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
      
        return responseCreateCard.data.id;
      }

      //create label on card
      async function createLabels(){
        let idCard= await createCard();

        const responseCreateLabelEmail = await api.post(`cards/${idCard}/labels${url}&color=${cor}&name=${email}`);
         return responseCreateLabelEmail.data.url;
      }

      

    return(
      <div className="Landing">
        <header>
          <img src={Logo} alt="logo-trello" id="logo-trello"/>
          <h3>Prencha o formulário abaixo e crie seu board  no trello :)</h3>    
        </header>
        
        <main >
          <form id="formulario" onSubmit={initCreate}> 
           <div className="inputs-text">
              <Input
                required
                name="userName"
                label="Digite seu nome"
                placeholder="Digite seu nome aqui..."
                value={name}
                onChange={(e) => {setName(e.target.value)}}>
              </Input>
              <Input
                  name="userEmail"
                  label="Email"
                  placeholder="Digite seu email aqui..."
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}>
              </Input>
              <Textarea
                  required
                  name='userDescription'
                  label='Descrição sobre você'
                  placeholder="Eu sou muito divertido haha..."
                  value={description}
                  onChange={(e) => {setDescription(e.target.value)}}>
              </Textarea>
          </div>
          {console.log(idade)}
          <div className="checkboxs">
            <Checkbox
                name='+18'
                label='+18?'
                value=''
                onChange={(e) => {setIdade(e.target.value)}}>
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
  
  
        { randomScreen === 'success' && (
          <RandomScreen img={successIcon} text="Cadastro realizado com sucesso"/>
        )}

        {randomScreen === 'failed' && (
          ( <RandomScreen img={failedIcon} text="Houve um erro com o cadastro, tente novamente"/> )
        )}
    </div>

    

    );
}
export default Landing;