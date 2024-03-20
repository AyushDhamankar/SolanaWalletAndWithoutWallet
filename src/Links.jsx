import { Link } from "react-router-dom";

function Links () {
    return(
        <div>
            <Link style={{ color: 'black', textDecoration: 'none' }} to="/try1"><h1>Try 1(With Wallet)</h1></Link>
            <Link style={{ color: 'black', textDecoration: 'none' }} to="/try2"><h1>Try 2(Without Wallet)</h1></Link>
            <Link style={{ color: 'black', textDecoration: 'none' }} to="/init"><h1>Initialize using wallet</h1></Link>
            <Link style={{ color: 'black', textDecoration: 'none' }} to="/withoutwallet"><h1>Without Wallet</h1></Link>
        </div>
    );
}
export default Links;