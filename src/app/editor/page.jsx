
import ChatPanel from './components/chatPanel/ChatPanel'
import EditorPanel from './components/editorPanel/EditorPanel'
import { MyProvider } from './hooks/globalVariables'

export default function Editor() {
  return (
    <div>
      <MyProvider>
        <EditorPanel />
        <ChatPanel />
      </MyProvider>
    </div>
  )
}
