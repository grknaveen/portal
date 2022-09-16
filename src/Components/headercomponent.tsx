import Content from "./Content"
function Headercomponent() {
    return (
        <div className="sticky top-0 z-50">

            <div className="sticky navbar bg-base-100 ">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Burning Portal</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal p-0">
                        <Content/>
                    </ul>
                </div>
            </div>
        </div>

    )
}
export default Headercomponent;


const style = {

    position: "fixed",
    marginTop: '100px',
};