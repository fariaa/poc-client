import React, { Component } from 'react'
import './Client.css'

import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Card} from 'primereact/card';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

export default class Client extends Component{

    constructor(props){
        super(props)
    }

    state = {
        client: {
            id: 0,
            name: '',
            address: '',
            phone: ''
        },
        clients: [
            {
                id: 1,
                name: 'Lucas',
                address: 'R. Maria da Piedade Lopes Gonçalves',
                phone: '019 994989867'
            },
            {
                id: 2,
                name: 'Maria',
                address: 'R. José Pedro da Costa',
                phone: '019 995678899'
            }
        ]
    }

    onTodoChange = (event) => {
        this.setState({
            client: {...this.state.client, name: event.target.value }
        })
    }

    insert = () => {
        const id = this.state.clients.length + 1
        const client = {...this.state.client, id}

        if(client.name === '' || client.address === '' || client.phone === '')
            return 

        this.setState({
            clients: [...this.state.clients, client]
        }) 
        this.clear()
    }

    update = () => {
        let clients = this.state.clients.map(c => {
            return c.id === this.state.client.id ? this.state.client: c
        })
        this.setState({clients: clients})
        this.clear()
    }

    edit = (client) => {
        this.setState({
            client: client
        })
    }
    
    clear = () => {
        this.setState({client: {id: 0, name: '', address: '', phone: ''}})
    }

    delete = (id) => {

        let clients = this.state.clients.filter(client => {
            return client.id !== id
        })

        this.setState({
            clients: clients
        })
        this.clear()
    }

    actionTemplate(rowData, column) {
        return (
            <div className='buttons'>
                <div className='button'>
                    <Button
                        type="button" icon="pi pi-pencil"
                        className="p-button-info" onClick={() => this.edit(rowData)}
                    />
                </div>
                <div className='button'>
                    <Button
                        icon="pi pi-trash"
                        className="p-button-danger" onClick={() => this.delete(rowData.id)}
                    />
                </div>
            </div>
        );
    }

    render(){
        return (
            <div>
                <Card>
                    <div className='container'>
                        <div className='label'>
                            <label>id</label>
                        </div>
                        <div className='input'>
                            <InputText value={this.state.client.id} disabled={true} placeholder={'id'}/>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='label'>
                            <label>nome</label>
                        </div>
                        <div className='input'>
                            <InputText type="text" value={this.state.client.name} onChange={this.onTodoChange}/>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='label'>
                            <label>endereço</label>
                        </div>
                        <div className='input'>
                            <InputText type="text" value={this.state.client.address} onChange={e => {this.setState({client: {...this.state.client, address: e.target.value}})}}/>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='label'>
                            <label>telefone</label>
                        </div>
                        <div className='input'>
                            <InputText type="text" value={this.state.client.phone} onChange={e => {this.setState({client: {...this.state.client, phone: e.target.value}})}}/>
                        </div>
                    </div>
                    <div className='buttons'>
                        <div className='button'>
                            <Button onClick={this.insert} label='Inserir' />
                        </div>
                        <div className='button'>
                            <Button onClick={this.update} disabled={this.state.client.id <= 0} label='Alterar'/>
                        </div>
                        <div className='button'>
                            <Button className="ui-button-success" onClick={this.clear} label='Limpar' />
                        </div>
                    </div>
                    <div className='list'>
                        <DataTable value={this.state.clients}>
                            <Column field="id" header="Número" />
                            <Column field="name" header="Nome" />
                            <Column field="address" header="Endereço" />
                            <Column field="phone" header="Telefone" />
                            <Column body={this.actionTemplate.bind(this)} header="Ações" style={{ textAlign: 'center', width: '6em' }} />
                        </DataTable>
                    </div>
                </Card>
            </div>
        )
    }
}