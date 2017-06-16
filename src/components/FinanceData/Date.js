import React, {Component} from 'react'

import DatePicker from 'material-ui/DatePicker';


class Date extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dateInput: this.props.value && this.dateToString( this.props.value ) || "",
            isValidDateInput: true
        };


        this.handleSetDate = this.handleSetDate.bind(this);
        this.handleSetDateHand = this.handleSetDateHand.bind(this);
        this.getKurs = this.getKurs.bind(this);
        this.dateToString = this.dateToString.bind(this);
    }

    dateToString(date){
        let d = new window.Date(date);
        console.log(date);
        console.log(d);

        let curr_day = d.getDate();
        curr_day = curr_day < 10 ? ("0" + curr_day) : curr_day;
        let curr_month = d.getMonth() + 1;
        curr_month = curr_month < 10 ? ("0" + curr_month) : curr_month;
        let dateForImput = "" + curr_day + "/" + curr_month + "/" + String(d.getFullYear()).slice(2,4);
        return dateForImput;
    }

    handleSetDate(event, date) {
        let d = date,
            curr_day = d.getDate();
        curr_day = curr_day < 10 ? ("0" + curr_day) : curr_day;
        let curr_month = d.getMonth() + 1;
        curr_month = curr_month < 10 ? ("0" + curr_month) : curr_month;
        let curr_year = d.getFullYear(),
            dateFormat = "" + curr_year + curr_month + curr_day,
            dateForImput = "" + curr_day + "/" + curr_month + "/" + String(d.getFullYear()).slice(2,4);

        this.setState({
            dateInput: dateForImput,
            isValidDateInput: true
        });

        this.getKurs(dateFormat, +date);
    }

    getKurs(dateFormat, dateSec){

        console.log(dateFormat);

        this.props.getKurs(dateFormat, dateSec);
    }

    handleSetDateHand(e){
        let value = e.target.value;
        this.setState({ dateInput: value });

        if( value.length != 8 ){
            this.setState({ isValidDateInput: false });
        } else {

            let arrDate = value.split("/"),
                yyyy, mm, dd;

            if( this.isNumeric( arrDate[2]) ){
                yyyy = "20" + arrDate[2];
            } else {
                return;
            }

            if( this.isNumeric( arrDate[1]) ){
                mm = arrDate[1];
            } else {
                return;
            }

            if( this.isNumeric( arrDate[0]) ){
                dd = arrDate[0];
            } else {
                return;
            }

            // let test = "" + `${yyyy}-${mm}-${dd}`;

            let dateFormat = yyyy + mm + dd,
                dateSec = window.Date.parse(`${yyyy}-${mm}-${dd}`);

            this.getKurs(dateFormat, dateSec);
            this.setState({ isValidDateInput: true });

        }
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    render() {


        let DateTimeFormat = global.Intl.DateTimeFormat;

        return (
            <div>
                <input type="text"
                       className={"input-date" + (this.state.isValidDateInput ? "" : " error")}
                       placeholder="dd/mm/yy"
                       onChange={this.handleSetDateHand}
                       value={this.state.dateInput}
                 />

                <DatePicker hintText="дата"
                            onChange={this.handleSetDate}
                            autoOk="true"
                            cancelLabel="Отмена"
                            //maxDate={new Date()}
                            style={{
                                width: "2rem",
                                height: "2rem",
                                display: "inline-block",
                                overflow: "hidden",
                                verticalAlign: "middle",
                                marginLeft: "2rem",
                                textAlign: "right",
                                background: "url('img/date_range1.png')",
                                backgroundSize: "contain",
                                cursor: "pointer",
                                float: "right"
                            }}
                            locale="ru"
                            formatDate={new DateTimeFormat('ru', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            }).format}
                />
            </div>
        )
    }
}

export default Date;
