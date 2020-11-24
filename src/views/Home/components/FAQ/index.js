import React from 'react';

function FAQ() {
  return (
    <div id="FAQ" className="FAQ">
      <br />
      <h1>Perguntas Frequentes</h1>
      <div id="questions" className="questions">
        <div id="question1" className="question_left">
          {question('Quem pode se tornar aprendiz?', answer1)}
        </div>
        <div id="question2" className="question_right">
          {question('Quem pode se tornar mentor(a)?', answer2)}
        </div>
        <div id="question3" className="question_left">
          {question('Como uma aprendiz obtém o certificado?', answer3)}
        </div>
        <div id="question4" className="question_right">
          {question('Como um(a) mentor(a) obtém certificados?', answer4)}
        </div>
        <div id="question5" className="question_left">
          {question('Como solicitar um(a) mentor(a)?', answer5)}
        </div>
        <div id="question6" className="question_right">
          {question('Como solicitar uma aprendiz?', answer6)}
        </div>
        <div id="question7" className="question_left">
          {question('Como remover um(a) mentor(a)?', answer7)}
        </div>
        <div id="question8" className="question_right">
          {question('Como remover uma aprendiz?', answer8)}
        </div>
      </div>
      <br />
    </div>
  );
}

function question(title, answer) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{answer}</p>
    </div>
  )
}

const answer1 = 'Qualquer pessoa que se identifica com o gênero feminino pode se cadastrar como aprendiz.'
const answer2 = 'Aprendizes que terminaram o tutorial e as atividades se tornam automaticamente mentoras.Além disso, qualquer pessoa pode se cadastrar como mentor(a), sendo necessário apenas ser aprovado(a) em uma avaliação para comprovar sua aptidão.'
const answer3 = 'Você receberá o certificado de conclusão do tutorial assim que responder corretamente todas as atividades dos módulos.'
const answer4 = 'Assim que uma das aprendizes do(a) mentor(a) concluir todo o tutorial e receber o certificado de conclusão do tutorial, o(a) mentor(a), da mesma forma, receberá um certificado de mentoria voluntária.'
const answer5 = 'Acessando sua conta, haverá uma guia chamada Mentoria, onde é possível solicitar mentoria. Após ser vinculada a um dos nossos mentores, vocês poderão se comunicar clicando no ícone do chat que ficará sempre visível no canto inferior direito da plataforma.'
const answer6 = 'Acessando sua conta, haverá uma guia chamada Mentoria, onde é possível solicitar novas aprendizes. Após a vinculação, vocês poderão se comunicar clicando no ícone do chat que ficará sempre visível no canto inferior direito da plataforma.'
const answer7 = 'Acessando a mesma guia Mentoria, será exibido o card do seu/sua mentor(a). Na parte de baixo deste card há a opção de desvincular-se do(a) mentor(a). Quando clicar neste botão, aparecerá uma mensagem, para ter certeza de que você realmente quer remover o seu/sua mentor(a), então basta confirmar sua escolha.'
const answer8 = 'Acessando a guia Mentoria, será exibido a lista de suas aprendizes. Na parte de baixo desses cards, há uma opção de desvincular-se da aprendiz. Quando clicar nesse botão, aparecerá uma mensagem para você confirmar que quer realmente remover sua aprendiz. Por fim, basta confirmar sua escolha.'

export default FAQ;