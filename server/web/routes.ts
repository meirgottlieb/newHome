import {Application, Router} from 'express';
import {UserController} from './controllers/user.controller';
import {ErrorsHandler} from './middlewares/errors.handler';

export class Routes{

    readonly router: Router;
    
    constructor(router: Router){
        
        this.router = router;

        this.Configure();
    }   

    private Configure(){
        
        var user = new UserController();
        this.router.post('/api/v1/user', user.post);
    }

    public Apply(app: Application){
        
        app.use('/', this.router);
        var errorshandler = new ErrorsHandler();
        app.use(errorshandler.generic);
    }
}