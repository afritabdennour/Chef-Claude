import Chef from '../assets/download.png'
export default function Header() {
    return (
        <>
            <header>
                <img src={Chef} alt="chef-hat-img" className='header-img'/>
                <span className='header-txt'>Chef Claude</span>
            </header>
        </>
    )
}