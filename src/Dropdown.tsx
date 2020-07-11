
import React, {Component} from 'react';
import './Dropdown.css';

interface DropdownProps {
    default: string,
    buildingList: string[],
    onChange(newBuilding: string): void,
}

class Dropdown extends Component<DropdownProps> {

    selectBuilding = (event: any) => {
        const newBuildingName = event.target.value;
        this.props.onChange(newBuildingName);
    }

    getBuildings() {
        let items: any[] = [];
        let buildingList: string[] = this.props.buildingList.slice(1, this.props.buildingList.length-1);
        items.push(
            <option
                key={0}
                value={this.props.default}>{this.props.default}</option>
        )
        for (let i = 1; i <= buildingList.length; i++) {
            if (buildingList[i-1].length !== 0) {
                items.push(
                    <option
                        key={i}
                        value={buildingList[i-1]}
                    >{buildingList[i-1]}</option>
                );
            }
        }
        return (
            <select
                value={this.props.default}
                onChange={this.selectBuilding}>
                {items}
            </select>
        );
    };


    render() {
        return (
            <div className="dropdown">
                {this.getBuildings()}
            </div>
        );
    }

}

export default Dropdown;