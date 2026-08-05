import { getSSRUser } from '../../../server/auth.server';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
    const user = await getSSRUser();

    return <NavbarClient initialUser={user} />;
}