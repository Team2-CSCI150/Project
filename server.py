#!/usr/bin/env python3
"""Server for multi connections at once chat application."""
from socket import AF_INET, socket, SOCK_STREAM  # set up socket
from threading import Thread  # using threads


def accept_connections():
    """Greeting for connecting."""
    while True:
        client, client_adr = SERVER.accept()
        print("%s:%s has entered the room." % client_adr)
        client.send(bytes("Thank you for coming, what class are you in?", "utf8"))
        addresses[client] = client_adr
        Thread(target=hc, args=(client,)).start()


def hc(client):  # Takes client socket as argument.
    """Talks to one connection."""

    name = client.recv(BUFSIZ).decode("utf8")
    welcome = 'Welcome, hope you enjoy %s! To stop connection type {quit.}' % name
    client.send(bytes(welcome, "utf8"))
    message = "%s has joined the chat!" % name
    identify(bytes(message, "utf8"))
    clients[client] = name

    while True:
        message = client.recv(BUFSIZ)
        if message != bytes("{quit}", "utf8"):
            identify(message, name + ": ")
        else:
            client.send(bytes("{quit}", "utf8"))
            client.close()
            del clients[client]
            identify(bytes("%s has left the chat." % name, "utf8"))
            break


def identify(msg, prefix=""):  # prefix to know who is talking
    """Says something to everyone."""
    # socket part
    for sock in clients:
        sock.send(bytes(prefix, "utf8") + msg)


clients = {}
addresses = {}

HOST = '127.0.0.1'  # this is the pc's home address on its own network
PORT = 33000
BUFSIZ = 1024
ADDR = (HOST, PORT)

SERVER = socket(AF_INET, SOCK_STREAM)
SERVER.bind(ADDR)

if __name__ == "__main__":
    SERVER.listen(5)
    print("Waiting for connections...")
    ACCEPT_THREAD = Thread(target=accept_connections)  # threading
    ACCEPT_THREAD.start()
    ACCEPT_THREAD.join()
    SERVER.close()

