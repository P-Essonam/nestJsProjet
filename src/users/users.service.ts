import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { NotFoundException } from '@nestjs/common';




@Injectable()
export class UsersService {

    private users = [
        {
            "id": 1,
            "name": "Lean",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "Max",
            "role": "INTERN",
        },
        {
            "id": 3,
            "name": "Mux",
            "role": "INTERN",
        },
        {
            "id": 4,
            "name": "Box",
            "role": "INTERN",
        },
        {
            "id": 5,
            "name": "Der",
            "role": "INTERN",
        },
    ]

    findAll(role?: 'INTERN' | 'ADMIN'){
        if (role) {
            const roles = this.users.filter(user => user.role === role)
            if (roles.length === 0) {
                throw new NotFoundException('User role not found')
            }
            return roles
        }

        return this.users
    }
    findOne(id: number){
        const user = this.users.find(user => user.id === id)

        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    create(user : CreateUserDto){
        const userByHighestId = [...this.users].sort((a,b) => b.id - a.id)

        const newUser = {
            id: userByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUser: UpdateUserDto
        ){

        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUser}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number){
        const removeUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removeUser
    }

}
