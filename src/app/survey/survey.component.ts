import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatStepper} from '@angular/material';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SurveyComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  next = 'Nächste';
  back = 'Zurück';
  reset = 'Zurücksetzen';

  isLinear = true;
  emailSent = false;
  isDebug = false;
  isActive = false;

  anzahlRechnungen = '';
  anzahlRechnungenAuswahl: string[] = [
    'weniger als 20\'000',
    '20\'000 bis 100\'000',
    'über 100\'000'
  ];
  anzahlRechnungenComment = '';

  rechnungsTypen = '';
  rechnungsTypenAuswahl: string[] = [
    'Nur Gemeinkostenrechnungen',
    'Gemeinkostenrechnungen und Rechnungen mit Bestellbezug (MM)',
    'Gemeinkostenrechnungen und Rechnungen mit Bestellbezug sowie weitere Rechnungstypen'
  ];
  rechnungsTypenComment = '';

  rechnungenMitBestellbezug = 0;
  rechnungenMitBestellbezugComment = '';

  bestellLoesung = '';
  bestellLoesungAuswahl: string[] = [
    'Kein',
    'Gemäss Kommentar'
  ];
  bestellLoesungComment = '';

  kontierungsLogik = '';
  kontierungsLogikAuswahl: string[] = [
    'Kontierung nach Kostenstelle und Kostenart',
    'Kontierung nach Kostenstelle, Kostenart sowie weitere (siehe Beschreibung Fragestellung)',
    'Kontierung nach Kostenstelle, Kostenart sowie weitere (siehe Beschreibung Fragestellung) ' +
    'mit zusätzlichen Abhängigkeiten der Feldwerte (z.B. nur bestimmte Kostenstellen bei einer bestimmten Kostenart zugelassen)'
  ];
  kontierungsLogikComment = '';

  erpSystem = '';
  erpSystemAuswahl: string[] = [
    'Keines',
    'Verschiedene',
    'proALPHA',
    'ProConcept ERP',
    'PROFFIX',
    'PSIPenta',
    'swissaxis ERP',
    'Microsoft Dynamics AX',
    'Microsoft Dynamics Nav',
    'Bexio',
    'BusPro',
    'IN:ERP',
    'Comarch ERP Enterprise',
    'Sage',
    'abas Business Software',
    'Bison Process',
    'ams ERP',
    'europa3000',
    'IFAS',
    'Infor',
    'OpaccOne',
    'Oracle JD Edwards Enterprise One',
    'oxalon business solution',
    'Anderes'
  ].sort();
  erpSystemComment = '';

  dmsSystem = '';
  dmsSystemAuswahl: string[] = [
    'Keines',
    'OpenText',
    'Hyland',
    'Oracle',
    'SAP ILM',
    'HyperDoc von IQDoQ',
    'Kendox InfoShare',
    'Habel',
    'agorum',
    'Windream',
    'Alfresco',
    'ELO ECM Suite',
    'Comarch ECM',
    'Saperion',
    'DocuWare',
    'Arcplace',
    'Optimal Systems',
    'd.velop (d.3ecm, ecspand, foxdox)',
    'Microsoft SharePoint',
    'Doxis4 iECM von SER',
    'Laserfiche',
    'M-Files',
    'Canon Therefore',
    'Ricoh DMS',
    'KYOCERA Document Solutions',
    'Anderes',
    'Verschiedene'
  ].sort();
  dmsSystemComment = '';

  scanning = '';
  scanningAuswahl: string[] = [
    'Keine',
    'Lösung gemäss Kommentar',
  ].sort();
  scanningComment = '';

  name = '';
  email = '';
  company = '';
  comment = '';
  private message: string;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  sendEmail() {
    if (this.emailSent) {
      if (!confirm('Daten wurden bereits übermittelt. Wollen Sie die Daten wirklich nochmals übermitteln?')) {
        return;
      }
    }

    this.isActive = true;

    console.log('Sending email');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-functions-key': 'function key of azure email service'
      })
    };

    this.message = '<b>Name:</b> ' + this.name + '<br />';
    this.message += '<b>Email:</b> ' + this.email + '<br />';
    this.message += '<b>Firma:</b> ' + this.company + '<br />';
    this.message += '<br />';
    this.message += '<b>Anzahl Belege:</b> ' + this.anzahlRechnungen + '<br />';
    this.message += '<b>Kommentar:</b> ' + this.anzahlRechnungenComment + '<br />';
    this.message += '<br />';
    this.message += '<b>Kontierungslogik:</b> ' + this.kontierungsLogik + '<br />';
    this.message += '<b>Kommentar:</b> ' + this.kontierungsLogikComment + '<br />';
    this.message += '<br />';
    this.message += '<b>Rechnungstypen:</b> ' + this.rechnungsTypen + '<br />';
    this.message += '<b>Kommentar:</b> ' + this.rechnungsTypenComment + '<br />';
    this.message += '<br />';
    this.message += '<b>Rechnungen mit Bestellbezug:</b> ' + this.rechnungenMitBestellbezug + ' %<br />';
    this.message += '<b>Kommentar:</b> ' + this.rechnungenMitBestellbezugComment + '<br />';
    this.message += '<br />';
    this.message += '<b>Bestelllösung:</b> ' + this.bestellLoesung + '<br />';
    this.message += '<b>Kommentar:</b> ' + this.bestellLoesungComment + '<br />';
    this.message += '<br />';
    this.message += '<b>ECM System:</b> ' + this.dmsSystem + '<br />';
    this.message += '<b>Kommentar:</b> ' + this.dmsSystemComment + '<br />';
    this.message += '<br />';
    this.message += '<b>Scanning Lösung:</b> ' + this.scanning + '<br />';
    this.message += '<b>Kommentar:</b> ' + this.scanningComment + '<br />';
    this.message += '<br />';
    this.message += '<b>ERP System:</b> ' + this.erpSystem + '<br />';
    this.message += '<b>Kommentar:</b> ' + this.erpSystemComment + '<br />';
    this.message += '<br />';
    this.message += '<b>Kommentar:</b> ' + this.comment + '<br />';

    const content = '{"fromEmail": "fromEmail",' +
      '  "toEmail": "toEmail",' +
      '  "subject": "Subject",' +
      '  "message": "' + this.message + '",' +
      '  "isImportant": false' +
      '}';

    this.httpClient.post(
      'url to azure service',
      content,
      httpOptions).subscribe((val) => {
        console.log('POST call successful value returned in body',
          val);
      },
      response => {
        this.isActive = false;
        console.log('POST call in error', response);
        confirm('Daten konnten aufgrund eines Fehlers nicht übermittelt werden.');
      },
      () => {
        this.isActive = false;
        console.log('The POST observable is now completed.');
        this.emailSent = true;
        confirm('Daten wurden erfolgreich übermittelt.');
      });
  }

  resetFields() {
    if (confirm('Wollen Sie wirklich die Eingaben löschen und neu beginnen?')) {
      this.comment = '';
      this.rechnungsTypen = '';
      this.erpSystem = '';
      this.dmsSystem = '';
      this.anzahlRechnungen = '';
      this.kontierungsLogik = '';

      this.emailSent = false;

      this.stepper.selectedIndex = 0;
    }
  }

  readyToSend(): boolean {
    if (this.name.length > 0 && this.email.length > 0 && this.company.length > 0) {
      return true;
    }
    return false;
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1) {
      return value + ' %';
    }
    return value;
  }
}
