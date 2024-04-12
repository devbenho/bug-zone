import { Container } from 'inversify';
import { ILocalizer } from '@contracts/services/ILocaizer';
import { Localizer } from '../services/Localizer';

const container = new Container();
container.bind<ILocalizer>(ILocalizer).to(Localizer);

export default container;