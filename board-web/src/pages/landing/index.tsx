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
import Textarea from '../../components/textarea'
import Select from '../../components/Select'
import RandomScreen from "../../components/randomScreen/";
import CheckboxGroup from 'react-checkbox-group'



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
    const [options, setOptions] = useState<string[]>(['']);
    const [skills, setSkills] = useState<string[]>(['']);

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

//REQUESTS FOR TRELLO==================================+++++++
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
       
        options.forEach(async (value: string, key: number) => {
            const responseCreateLabel= await api.post(`cards/${idCard}/labels${url}&color=${cor}&name=${value}`);
          });
          skills.forEach(async (value: string, key: number) => {
            const responseCreateLabel= await api.post(`cards/${idCard}/labels${url}&color=${cor}&name=${value}`);
          });
          return responseCreateLabelEmail.data.url;
      } 
//=======================================================================

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
       
          <p>Marque uma das opções</p><hr/>
          <div className="checkboxs">

              { useEffect(() => {
                const timer = setTimeout(() => {
                setOptions([''])
              }, 5000)
              return () => clearTimeout(timer)
              }, [])}

              <CheckboxGroup name="options" value={options} onChange={setOptions}>
              {(Checkbox) => (
                <>
                  <label>
                    <Checkbox value="Gosta de música" /> Gosta de música?
                  </label>
                  <label>
                    <Checkbox value="Gosta de Tecnologia" /> Gosta de tecnologia?
                  </label>
                  <label>
                    <Checkbox value="+18" /> É maior de 18 anos?
                  </label>
                </>
              )}
            </CheckboxGroup>
         </div>
             
              <hr/>  
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
               
          <hr/>
          <p>selecione uma skill</p>
          <div className="skills">
              
          { useEffect(() => {
                const timer = setTimeout(() => {
                setSkills([''])
              }, 5000)
              return () => clearTimeout(timer)
              }, [])}
          
          <CheckboxGroup name="skills" value={skills} onChange={setSkills}>
              {(Checkbox) => (
                <>
                  <label>
                    <Checkbox value="Designer" /> 
                  </label>
                  <label>
                    <Checkbox value="Programador" /> 
                  </label>
                  <label>
                    <Checkbox value="Outro" /> 
                  </label>
                </>
              )}
            </CheckboxGroup>
          </div>


          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
              Importante <br />
              Preencha todos os dados
            </p>
            <button type="submit" >Criar board</button>
          </footer>    
          </form>   
       </main>
  
  
        { randomScreen === 'success' && (
          <RandomScreen img={successIcon} text={`Board criado com sucesso :)`}/>
        )}

        {randomScreen === 'failed' && (
          ( <RandomScreen img={failedIcon} text="Houve um erro com a criação do Board, tente novamente"/> )
        )}
    </div>

    

    );
}
export default Landing;