#!/usr/bin/env python3
"""Script for Tkinter GUI chat client."""       #followed tkinter module
from socket import AF_INET, socket, SOCK_STREAM        #initiate socket
from threading import Thread            #Threading
import tkinter


def receive():
    """Looks at received messages."""
    while True:
        try:
            message = client_socket.recv(B).decode("utf8")     #we chose utf8 because it's better for words
            message_list.insert(tkinter.END, message)
        except OSError:  # No connections. saw this on online example
            break


def send(event=None):  
    """Sends messages."""
    messages = s_message.get()
    s_message.set("")  # Lets user enter
    client_socket.send(bytes(messages, "utf8"))
    if messages == "{quit}":      #lets them leave and closes the GUI
        client_socket.close()
        top.quit()


def bye(event=None):
    """This is the exit message."""
    s_message.set("{quit}")
    send()

top = tkinter.Tk()       #from tkinter module
top.title("Conversation")       #title for chatroom

messages_frame = tkinter.Frame(top)
s_message = tkinter.StringVar()  # For the messages to be sent.
s_message.set("Enter text.")
scrollbar = tkinter.Scrollbar(messages_frame)  # To look at old things.
message_list = tkinter.Listbox(messages_frame, height=15, width=50, yscrollcommand=scrollbar.set)        #message view layout, used similar from the tkinter example and picked random heiht and width
scrollbar.pack(side=tkinter.RIGHT, fill=tkinter.Y)
message_list.pack(side=tkinter.LEFT, fill=tkinter.BOTH)
message_list.pack()
messages_frame.pack()

entry_field = tkinter.Entry(top, textvariable=s_message)
entry_field.bind("<Return>", send)
entry_field.pack()
send_button = tkinter.Button(top, text="Send", command=send)
send_button.pack()

top.protocol("WM_DELETE_WINDOW", bye)

#Socket set up
HOST = input('Enter host: ') #enter 127.0.0.1 if server is running on home address
PORT = input('Enter port: ') 
if not PORT:
    PORT = 33000   #automatically links to this if no entry
else:
    PORT = int(PORT)

B = 1024 #buffer size
A = (HOST, PORT)

client_socket = socket(AF_INET, SOCK_STREAM)
client_socket.connect(A)
#set up GUI
receive_thread = Thread(target=receive)
receive_thread.start()
tkinter.mainloop()  # Starts GUI execution.

