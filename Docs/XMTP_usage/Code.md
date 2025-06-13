# XMTP Integration Guide

This guide covers the key XMTP implementation snippets from the TradeTalk application.



## State Management

```javascript
// XMTP State
const [xmtpClient, setXmtpClient] = useState(null);
const [conversation, setConversation] = useState(null);
const [isInitializingXmtp, setIsInitializingXmtp] = useState(false);
const [xmtpError, setXmtpError] = useState('');
```

## 1. Initialize XMTP Client

```javascript
// Initialize XMTP Client
const initializeXmtp = async () => {
  if (!isConnected || !address) {
    setXmtpError('Please connect your wallet first');
    return;
  }

  setIsInitializingXmtp(true);
  setXmtpError('');

  try {
    // Initialize XMTP client
    const client = await XmtpClient.create(window.ethereum, {
      env: "production" // or "dev" for development
    });
    
    setXmtpClient(client);
    console.log('XMTP client initialized successfully');
    
    // Load existing conversations
    await loadConversations(client);
    
  } catch (error) {
    console.error('Error initializing XMTP:', error);
    setXmtpError(`Failed to initialize XMTP: ${error.message}`);
  } finally {
    setIsInitializingXmtp(false);
  }
};
```

## 2. Load Existing Conversations

```javascript
// Load conversations
const loadConversations = async (client) => {
  try {
    const conversations = await client.conversations.list();
    console.log('Loaded conversations:', conversations.length);
    
    // For demo, we'll use the first conversation or create one if none exist
    if (conversations.length > 0) {
      const conv = conversations[0];
      setConversation(conv);
      await loadMessages(conv);
    }
  } catch (error) {
    console.error('Error loading conversations:', error);
    setXmtpError(`Failed to load conversations: ${error.message}`);
  }
};
```

## 3. Create New Conversation

```javascript
// Create new conversation
const createConversation = async () => {
  if (!xmtpClient || !targetAddress) {
    setXmtpError('Please enter a valid address to start conversation');
    return;
  }

  try {
    setIsInitializingXmtp(true);
    
    // Check if address can receive messages
    const canMessage = await xmtpClient.canMessage(targetAddress);
    if (!canMessage) {
      setXmtpError('Target address is not registered with XMTP');
      return;
    }

    // Create conversation
    const conv = await xmtpClient.conversations.newConversation(targetAddress);
    setConversation(conv);
    setMessages([]);
    setXmtpError('');
    
    console.log('New conversation created with:', targetAddress);
    
  } catch (error) {
    console.error('Error creating conversation:', error);
    setXmtpError(`Failed to create conversation: ${error.message}`);
  } finally {
    setIsInitializingXmtp(false);
  }
};
```

## 4. Load and Stream Messages

```javascript
// Load messages from conversation
const loadMessages = async (conv) => {
  try {
    const xmtpMessages = await conv.messages();
    
    const formattedMessages = xmtpMessages.map((msg, index) => ({
      id: index + 1,
      sender: msg.senderAddress === address ? userRole : (userRole === 'buyer' ? 'seller' : 'buyer'),
      message: msg.content,
      timestamp: msg.sent.toISOString(),
      verified: true,
      hash: `0x${Math.random().toString(16).substr(2, 64)}`, // Mock hash for UI
      senderAddress: msg.senderAddress
    }));

    setMessages(formattedMessages);
    
    // Stream new messages
    const stream = await conv.streamMessages();
    for await (const message of stream) {
      const newMsg = {
        id: Date.now(),
        sender: message.senderAddress === address ? userRole : (userRole === 'buyer' ? 'seller' : 'buyer'),
        message: message.content,
        timestamp: message.sent.toISOString(),
        verified: true,
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        senderAddress: message.senderAddress
      };
      
      setMessages(prev => [...prev, newMsg]);
    }
    
  } catch (error) {
    console.error('Error loading messages:', error);
    setXmtpError(`Failed to load messages: ${error.message}`);
  }
};
```

## 5. Send Messages

```javascript
// Send message via XMTP
const handleSendMessage = async () => {
  if (!newMessage.trim() || !conversation || !isConnected) return;

  setIsSendingMessage(true);
  const tempId = Date.now();
  const timestamp = new Date().toISOString();
  
  // Add optimistic message to UI
  const optimisticMessage = {
    id: tempId,
    sender: userRole,
    message: newMessage,
    timestamp,
    verified: false,
    hash: null,
    senderAddress: address
  };

  setMessages(prev => [...prev, optimisticMessage]);
  const messageToSend = newMessage;
  setNewMessage('');

  try {
    // Send message via XMTP
    await conversation.send(messageToSend);
    
    // Update message as verified
    const messageHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    setMessages(prev => prev.map(msg => 
      msg.id === tempId 
        ? { ...msg, verified: true, hash: messageHash }
        : msg
    ));

  } catch (error) {
    console.error('Error sending message:', error);
    setXmtpError(`Failed to send message: ${error.message}`);
    
    // Remove optimistic message on failure
    setMessages(prev => prev.filter(msg => msg.id !== tempId));
    setNewMessage(messageToSend); // Restore message in input
  } finally {
    setIsSendingMessage(false);
  }
};
```

## Key XMTP Methods Used

1. **XmtpClient.create()** - Initialize the XMTP client with wallet
2. **client.conversations.list()** - Get existing conversations
3. **client.canMessage()** - Check if an address can receive XMTP messages
4. **client.conversations.newConversation()** - Create new conversation with an address
5. **conversation.messages()** - Load historical messages from a conversation
6. **conversation.streamMessages()** - Stream real-time messages
7. **conversation.send()** - Send a message to the conversation

## Prerequisites

- Connected wallet (using wagmi/ethers)
- Target address must be XMTP-enabled
- Network access to XMTP network (production or dev)

## Error Handling

The implementation includes comprehensive error handling for:
- Wallet connection issues
- XMTP initialization failures
- Message sending failures  
- Network connectivity issues
- Invalid target addresses

## Environment Configuration

```javascript
const client = await XmtpClient.create(window.ethereum, {
  env: "production" // Use "dev" for development/testing
});
```