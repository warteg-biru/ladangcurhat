import React from 'react'
import ReactDOM from 'react-dom'
import openSocket from 'socket.io-client'
import styled from 'styled-components'

const ChatForm = styled.form`
  padding: 3px;
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 100vw;
`

const ChatInput = styled.input`
  border: 0;
  padding: 10px;
  margin: 5px;
  margin-left: 20px;
  margin-right: .5%;
  border-radius: 15px;
  font-size: 13px;
  font-family: 'Varela Round', sans-serif;
  letter-spacing: 0.5px;
  border: solid 1px lightskyblue;
  outline: 0;
  width: 70%;
  :focus {
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.3);
  }
`

const ChatButton = styled.button`
  margin-right: 20px;
  line-height: 18px;
  width: 20%;
  background: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  border: solid 1px lightskyblue;

  cursor: pointer;
  transition: all .5s ease-in-out;
  
  :hover {
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
  }
  :focus {
    outline: 0;
  }
`

const MessageContainerAlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 5%;
`

const MessageContainerAlignLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`

const SpeechBubble = styled.div`
  word-wrap: break-word;
  display: inline-block;
  border-radius: 25px;
  padding: 10px;
  margin-top: 2px;
  background: lightskyblue;
`
const SenderName = styled.div`
  margin-top: 10px;
  font-size: 8pt;
  color: grey;
`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      thisClientID: '',
      chatInput: '',
      socket: null,
      messages: [],
    }
    this.onChatInputChange = this.onChatInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.initiateSocket()
  }

  onChatInputChange(e) {
    this.setState({ chatInput: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const { socket, chatInput } = this.state
    socket.emit('chatMessage', chatInput)
    this.setState({ chatInput: '' })
  }

  initiateSocket() {
    const socket = openSocket('http://localhost:3000')
    socket.on('chatMessage', (res) => {
      const { message, clientID, clientName } = res
      this.setState(({ messages }) => ({
        messages: [
          ...messages,
          { message, clientID, clientName },
        ],
      }))
    })
    socket.on('connected', (res) => {
      const { clientID } = res
      this.setState({ thisClientID: clientID })
    })
    this.setState({ socket })
  }

  renderMessages() {
    const { messages, thisClientID } = this.state
    if (messages.length > 0) {
      return messages.map(({ clientID, clientName, message }) => {
        if (thisClientID === clientID) {
          return (
            <MessageContainerAlignLeft>
              <div>
                <SenderName>{clientName}</SenderName>
                <SpeechBubble>{message}</SpeechBubble>
              </div>
            </MessageContainerAlignLeft>
          )
        }
        return (
          <MessageContainerAlignRight>
            <div>
              <SenderName>{clientName}</SenderName>
              <SpeechBubble>{message}</SpeechBubble>
            </div>
          </MessageContainerAlignRight>
        )
      })
    }
    return null
  }

  render() {
    const { chatInput } = this.state
    return (
      <div style={{ width: '100vw' }}>
        {this.renderMessages()}
        <ChatForm action="" onSubmit={e => this.onSubmit(e)}>
          <ChatInput value={chatInput} onChange={e => this.onChatInputChange(e)} />
          <ChatButton type="submit">Submit</ChatButton>
        </ChatForm>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
